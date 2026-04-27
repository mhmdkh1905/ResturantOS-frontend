# Fix Add Menu Item - Implementation Plan

- [x] 1. Fix `src/api/menu.js` - Filter out empty/null values in `createMenuItem` to match backend expectations
- [x] 2. Fix `src/components/modals/addMenuItemModal/AddMenuItemModal.jsx` - Filter incomplete ingredients before submit
- [x] 3. Fix `src/pages/menu/Menu.jsx` - Change `handleAdd` to use `mutateAsync` so modal stays open on error
- [x] 4. Fix modal form reset - Remove premature `setForm(EMPTY)` so user input is preserved on API error
- [x] 5. Run dev and test

