import { jwtVerify } from "jose";
import type { DecodedToken, SSOMessage } from "@/types/auth";

export class AuthService {
  private static JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "";
  private static MAIN_APP_ORIGIN = process.env.NEXT_PUBLIC_MAIN_APP_ORIGIN || "https://acentecom.com";
  private static listenerAdded = false;

  /**
   * Setup postMessage listener for SSO token from parent frame (idempotent)
   */
  static setupSSO() {
    if (this.listenerAdded) return;

    window.addEventListener("message", (event) => {
      this.handleSSO(event);
    });

    this.listenerAdded = true;
  }

  /**
   * Handle incoming SSO token from main app
   */
  private static async handleSSO(event: MessageEvent<SSOMessage>) {
    // 1. CRITICAL: Verify origin
    if (event.origin !== this.MAIN_APP_ORIGIN) {
      console.warn(`[SSO] Rejected message from untrusted origin: ${event.origin}`);
      return;
    }

    // 2. Verify message type
    if (event.data?.type !== "SSO_TOKEN") {
      return;
    }

    const token = event.data.token;

    // 3. Decode and validate JWT
    try {
      const decoded = await this.validateAndDecodeToken(token);

      // 4. Check token expiry
      if (decoded.exp * 1000 < Date.now()) {
        console.error("[SSO] Token has expired");
        this.requestTokenRefresh();
        return;
      }

      // 5. Store session
      this.storeSession(decoded);

      // 6. Dispatch auth event (for app to react to auth change)
      window.dispatchEvent(
        new CustomEvent("sso-authenticated", { detail: decoded })
      );

      console.log("[SSO] Authentication successful", {
        email: decoded.email,
        user_type: decoded.user_type,
      });
    } catch (error) {
      console.error("[SSO] Token validation failed:", error);
      window.dispatchEvent(
        new CustomEvent("sso-auth-error", { detail: error })
      );
    }
  }

  /**
   * Validate JWT signature and decode payload using jose
   */
  private static async validateAndDecodeToken(token: string): Promise<DecodedToken> {
    try {
      const secret = new TextEncoder().encode(this.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });
      return payload as unknown as DecodedToken;
    } catch (error) {
      throw new Error("Invalid JWT: " + (error instanceof Error ? error.message : String(error)));
    }
  }

  /**
   * Store decoded token in sessionStorage
   */
  private static storeSession(decoded: DecodedToken) {
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

    // Verify not expired
    if (user.exp * 1000 < Date.now()) {
      this.requestTokenRefresh();
      return false;
    }

    return true;
  }

  /**
   * Request fresh token from parent frame
   */
  private static requestTokenRefresh() {
    window.parent.postMessage(
      { type: "REQUEST_TOKEN_REFRESH" },
      this.MAIN_APP_ORIGIN
    );
  }

  /**
   * Clear session on logout
   */
  static logout() {
    sessionStorage.removeItem("sso_user");
  }
}
