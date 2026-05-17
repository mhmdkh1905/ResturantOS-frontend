// Hey, quick note on this file - there are a few things we should fix up:
// 1. localStorage can get corrupted, and we're not handling it well
// 2. Role comparisons are case-sensitive which could cause bugs
// 3. No validation on what we're storing/retrieving
// 4. Would be good to add TypeScript eventually
// Let's clean this up as we go. See comments below.

export const getToken = () => {
    // FEEDBACK: Just returning the token without validating it's actually a JWT
    // If localStorage gets corrupted, we'll pass a broken token to the API
    // Maybe add a quick check here that it has the right format (three parts separated by dots)
    return localStorage.getItem("token");
};

export const getUser = () => {
    try {
          const user = localStorage.getItem("user");

      if (!user || user === "undefined") return null;

      // NOTE: This will throw if the JSON is malformed
      // Good that we have the try-catch, but we should probably log what happened
      // so we can debug it if it's happening in production
      return JSON.parse(user);
    } catch (err) {
          // ISSUE: Silent fail here. If a user has corrupted data, they'll just be logged out
      // without knowing why. Should log this, maybe clear the bad data too
      return null;
    }
};

// THOUGHT: We call getUser() a lot in isAdmin(), isChef(), isWaiter()
// We're parsing the JSON and getting the role over and over
// Could we cache this or use a context provider instead of localStorage?

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export const isAdmin = () => {
    const user = getUser();
    // HEADS UP: This assumes the role is lowercase "admin"
    // If the backend ever returns "Admin" or "ADMIN" we'll have a problem
    // Should normalize this: user?.role?.toLowerCase() === "admin"
    return user?.role === "admin";
};

export const isChef = () => {
    const user = getUser();
    // Same issue as isAdmin - role comparison is case-sensitive
    return user?.role === "chef";
};

export const isWaiter = () => {
    const user = getUser();
    // Same issue here too
    return user?.role === "waiter";
};

export const logout = () => {
    // Pretty straightforward, but should we call the API to invalidate the token on the server?
    // Right now we just clear localStorage, but the token might still be valid server-side
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// SUGGESTION: Could we add a function like this to make it easier to set auth data after login?
// Right now the login component probably has to know to set both token and user separately
// export const setAuthData = (token, user) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(user));
// };

// ALSO: Would be good to have a helper that checks if the role is valid
// instead of having three separate functions
// export const hasRole = (requiredRoles) => {
//   const user = getUser();
//   if (!user) return false;
//   const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
//   return roles.includes(user?.role?.toLowerCase());
// };
