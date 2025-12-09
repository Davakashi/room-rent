// Temporary auth exports for build compatibility
// These functions are not actually used in the current implementation
// The app uses custom JWT authentication via backend API

// Temporary auth exports for build compatibility
// These functions are not actually used in the current implementation
// The app uses custom JWT authentication via backend API

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function signIn(
  _provider: string,
  _options?: { email?: string; password?: string; redirect?: boolean; redirectTo?: string }
): Promise<{ error?: string } | undefined> {
  // This is a placeholder - actual authentication is handled via backend API
  // See app/auth/_components/login/form.tsx for the actual implementation
  console.warn("signIn from @/app/auth is not implemented - using custom JWT auth instead");
  return undefined;
}

export async function signOut(_options?: { redirectTo?: string }): Promise<void> {
  // This is a placeholder - actual logout is handled via AuthContext
  // See lib/auth/context.tsx for the actual implementation
  console.warn("signOut from @/app/auth is not implemented - using custom JWT auth instead");
}
/* eslint-enable @typescript-eslint/no-unused-vars */

