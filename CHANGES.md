# Changes Documentation

## API Change

- **Previous API:** `https://jsonplaceholder.typicode.com/users` — fetched a list of 10 users with details like name, email, phone, company, address, etc.
- **New API:** `https://official-joke-api.appspot.com/jokes/ten` — fetches 10 random jokes, each containing `id`, `type`, `setup`, and `punchline`.

## What Changed

### 1. Type Definitions (`app/types/user.types.ts`)
- Removed `User`, `Address`, `Company`, `Geo` types.
- Added a new `Joke` type with fields: `id`, `type`, `setup`, `punchline`.

### 2. Main Page (`app/page.tsx`)
- API endpoint changed from the users API to the official-joke-api.
- Search now filters by joke `setup`, `punchline`, and `type` instead of user name/email/company.
- Background changed to a colorful purple-pink-yellow gradient.
- Title changed from "User Directory" to "😂 Joke Corner" with a gradient text effect.
- Added subtitle: "Hover on a card to reveal the punchline!"

### 3. Card Component (`app/components/UserCard.tsx`)
- Complete redesign with a **3D flip card** animation.
- **Front side:** Shows the joke setup on a colorful gradient background with an emoji and joke type badge. Each card gets a different gradient color from a palette of 10 colors.
- **Back side:** Reveals the punchline on a white card with a dashed purple border on hover.
- Cards flip with a smooth 0.6s CSS transition using `rotateY(180deg)`.

### 4. List Component (`app/components/UserList.tsx`)
- Updated to pass an `index` prop to each card for color assignment.
- Type changed from `User[]` to `Joke[]`.

### 5. Global Styles (`app/globals.css`)
- Added flip card CSS: `perspective`, `transform-style: preserve-3d`, `backface-visibility: hidden`, and hover-triggered `rotateY(180deg)` transition.
