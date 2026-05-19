import { jwtVerify } from "jose";
import type { DecodedToken, SSOMessage } from "@/types/auth";

export class AuthService {
  private static JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";
  private static MAIN_APP_ORIGIN = process.env.NEXT_PUBLIC_MAIN_APP_ORIGIN || "";
  private static listenerAdded = false;
  /**
   * Setup postMessage listener for SSO token from parent frame (idempotent)
   */
  static setupSSO() {
    if (typeof window === "undefined") return;
    if (this.listenerAdded) return;

    // Check for token in URL
    this.checkTokenFromUrl();

    const messageHandler = (event: MessageEvent) => {
      // Handle SSO token
      if (event.data?.type === "SSO_TOKEN") {
        this.handleSSO(event);
      }
      // Handle logout from parent
      else if (event.data?.type === "LOGOUT") {
        this.logout();
        window.dispatchEvent(new CustomEvent("sso-logout"));
      }
    };

    window.addEventListener("message", messageHandler);
    this.listenerAdded = true;
  }

  /**
   * Handle incoming SSO token from main app
   */
  private static async handleSSO(event: MessageEvent<SSOMessage>) {
    // 1. Verify message type first
    if (!event.data || event.data?.type !== "SSO_TOKEN") {
      return;
    }

    // 2. Verify origin
    if (event.origin !== this.MAIN_APP_ORIGIN) {
      console.warn(`[SSO] Rejected message from untrusted origin: ${event.origin}, expected: ${this.MAIN_APP_ORIGIN}`);
      return;
    }

    const token = event.data.token;

    try {
      const decoded = await this.validateAndDecodeToken(token);

      if (decoded.exp * 1000 < Date.now()) {
        console.error("[SSO] Token has expired");
        return;
      }

      this.storeSession(decoded);
      window.dispatchEvent(new CustomEvent("sso-authenticated", { detail: decoded }));
    } catch (error) {
      console.error("[SSO] Token validation failed:", error);
      window.dispatchEvent(new CustomEvent("sso-auth-error", { detail: error }));
    }
  }

  /**
   * Validate JWT signature and decode payload using jose
   */
  private static async validateAndDecodeToken(token: string): Promise<DecodedToken> {
    try {
      if (!this.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
      }

      const secret = new TextEncoder().encode(this.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });

      const decoded = payload as unknown as DecodedToken;
      const requiredFields = ["sub", "email", "name", "roles", "user_type", "brand_ids", "custom_role_types", "iat", "exp"];
      const missingFields = requiredFields.filter(field => !(field in decoded));

      if (missingFields.length > 0) {
        throw new Error(`Token missing required fields: ${missingFields.join(", ")}`);
      }

      return decoded;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("[SSO] JWT validation error:", errorMsg);
      throw new Error("Invalid JWT: " + errorMsg);
    }
  }

  /**
   * Store decoded token in sessionStorage
   */
  private static storeSession(decoded: DecodedToken) {
    sessionStorage.removeItem("sso_user");
    sessionStorage.setItem("sso_user", JSON.stringify(decoded));
  }

  /**
   * Get current authenticated user
   */
  static getUser(): DecodedToken | null {
    if (typeof window === "undefined") return null;

    const stored = sessionStorage.getItem("sso_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }

    return null;
  }

  /**
   * Check if user is authenticated and token is not expired
   */
  static isAuthenticated(): boolean {
    const user = this.getUser();
    if (!user) return false;

    if (user.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  }

  /**
   * Clear session on logout
   */
  static logout() {
    sessionStorage.removeItem("sso_user");
  }

  /**
   * Check for token in URL query parameters
   */
  private static checkTokenFromUrl() {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("sso_token");

    if (token) {
      const event = new MessageEvent("message", {
        data: { type: "SSO_TOKEN", token },
        origin: this.MAIN_APP_ORIGIN,
      });
      this.handleSSO(event as any);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

}
