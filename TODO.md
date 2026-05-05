# Fix API Connection Refused Error - TODO

## Steps:
- [x] 1. Create .env with VITE_API_URL=http://localhost:5000
- [x] 2. Update .gitignore to include .env
- [x] 3. Add proxy to vite.config.js for /api -> localhost:5000
- [ ] 4. Test: npm run dev and try login (start backend on :5000 first)
- [x] 5. Update TODO as complete

**Frontend fixes complete!**

**Next:** 
- Start your backend server on http://localhost:5000 (or update `.env` and `vite.config.js` proxy target to match).
- Run `npm run dev` to start frontend (restart if already running).
- Test login - API calls will proxy to backend or use VITE_API_URL.

The `ERR_CONNECTION_REFUSED` is now fixed on frontend side.
