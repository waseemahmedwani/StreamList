# Watchlist Feature — Task Breakdown
**Tech Stack: React Native (TypeScript)**

---

## Core Tasks

**Task 1 — `useWatchlist` Hook**
Create a  ustom hook managing all watchlist logic — add, remove, check if saved. Holds the `WatchlistTitle` TypeScript interface and a mock data array of 5 titles.

**Task 2 — `WatchlistCard` Component**
Individual content card showing thumbnail, star rating badge, title, year, genre, a remove (×) button, and a Details button. Accepts a `WatchlistTitle` prop and callbacks for remove and details actions.

**Task 3 — `FilterTabs` Component**
Horizontal tab bar with genre options - All / Movies / Series etc. Active tab renders highlighted, inactive tabs are outlined.

**Task 4 — Tab Bar Entry + Navigation Registration**
Entry point for watchlist feature in the app. Registers `WatchlistScreen` in the bottom tab navigator with a bookmark icon. Includes an auth guard that shows 'login in first' popup and redirects unauthenticated users to `LoginScreen`.

**Task 5 — `WatchlistScreen` Filled State**
Main screen assembling all prior components — header, `FilterTabs`, and a 2-column `FlatList` grid of `WatchlistCard` items wired to `useWatchlist`. Filtered list updates based on active tab selection.

**Task 6 — Empty State**
Standalone `WatchlistEmptyState` component rendered inside `WatchlistScreen` when the list is empty — bookmark icon, heading, subtitle copy, and a "Browse Trending Now" CTA that navigates to the Home screen.

---

## Incremental / Future Tasks

**1 — Watchlist icon on `ContentCard`**
Add a bookmark icon to the existing `ContentCard` component used on Home and Search screens. Tapping it calls `addToWatchlist` or `removeFromWatchlist` from the hook, with a filled/outlined state reflecting whether the title is saved.

**2 — "Because You Saved xxxx" Recommendations Row**
Horizontal scroll row at the bottom of `WatchlistScreen` suggesting similar titles based on the last saved item. Shows title name and genre label, with a "View All" link.


# CDIR Prompts — Watchlist Feature
**Tasks 1 & 2 | Tech Stack: React Native (TypeScript)**

---

## Task 1 — `useWatchlist` Hook

### C — Context
```
We are creating a react native OTT app (TypeScript, strict mode)
Hooks live in: src/hooks/
Existing hook pattern to follow: @file src/hooks/useContinueWatching.ts
State management: local useState only (no Redux, no Context for now)
No new libraries to be installed
```

### D — Decompose
```
This task covers only the data and logic layer.
No UI. No API calls. No AsyncStorage.
Scope is limited to: state, add, remove, isInWatchlist, mock data, and TypeScript types.
```

### I — Instruct
```
Create a custom hook at src/hooks/useWatchlist.ts

The hook must:
1. Define and export a TypeScript interface WatchlistTitle with fields:
   id: string, title: string, year: number, genre: string, thumbnail: string, rating: number

2. Initialise useState with a mock array of 5 WatchlistTitle objects
   Use realistic OTT content (movie/series titles, varied genres)

3. Expose the following functions:
   - addToWatchlist(title: WatchlistTitle): void
     Add only if not already present (check by id)
   - removeFromWatchlist(id: string): void
     Filter out item matching id
   - isInWatchlist(id: string): boolean
     Return true if id exists in current watchlist state

4. Return: { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }

Do NOT:
- Add AsyncStorage or any persistence
- Add API calls
- Create any UI or component
- Use any type — all types must be explicit
- Install any new package
```

### R — Review Checklist
```
- WatchlistTitle interface is exported and matches the field spec
- addToWatchlist does not create duplicates
- removeFromWatchlist does not mutate state directly
- isInWatchlist returns a boolean, not an object
- No any types anywhere in the file
- File lives at src/hooks/useWatchlist.ts
```

---

## Task 2 — `WatchlistCard` Component

### C — Context
```
we are buidling a react native OTT app (TypeScript, strict mode)
Components live in: src/components/
WatchlistTitle interface lives in: src/hooks/useWatchlist.ts
Existing card pattern to follow: @file src/components/ContentCard.tsx
Styling convention: StyleSheet.create only — no inline styles, no styled-components
Image handling pattern: @file src/components/ContentCard.tsx (uses React Native Image with resizeMode='cover')
No new libraries
```

### D — Decompose
```
This task covers only the WatchlistCard component.
No screen, no list, no grid. Isolated component only.
The card receives its data via props — it does not call useWatchlist directly.
```

### I — Instruct
```
Create a component at src/components/WatchlistCard.tsx

The component must accept these props (typed with WatchlistTitle):
  - item: WatchlistTitle
  - onRemove: (id: string) => void
  - onDetailsPress: (id: string) => void

The card must render:
1. Thumbnail image
   - Fixed size: width 100%, aspect ratio 3:4
   - resizeMode: 'cover'
   - Source: item.thumbnail

2. Star rating badge
   - Positioned top-left overlay on the thumbnail
   - Shows ★ followed by item.rating (e.g. ★ 8.4)
   - Small badge with semi-transparent dark background

3. Below the thumbnail:
   - item.title (bold, truncate to 1 line)
   - item.year · item.genre (muted, smaller font, single line)

4. Remove button (×)
   - Positioned top-right overlay on the thumbnail
   - On press: calls onRemove(item.id)
   - TouchableOpacity, not a text button

5. Details button
   - Rendered below title/genre text
   - Full width, outlined style
   - On press: calls onDetailsPress(item.id)
   - Label: 'Details'

Follow the layout structure of @file src/components/ContentCard.tsx
Use StyleSheet.create for all styles
Do NOT call useWatchlist inside this component
Do NOT install any new package
Do NOT use any type
```

### R — Review Checklist
```
- Props are typed using WatchlistTitle (imported from src/hooks/useWatchlist.ts)
- onRemove is called with item.id, not the full object
- No inline styles anywhere in the file
- Remove button and Details button use TouchableOpacity
- Rating badge is overlaid on the image, not below it
- Component does not import or call useWatchlist
- File lives at src/components/WatchlistCard.tsx
```


# Plan Mode Outline — Task 5: `WatchlistScreen` Filled State

---

## Clarifying Questions the Agent Should Ask

Before writing any code, the agent should raise these:

1. Is there an existing base screen component or template I should wrap this in, or do I start from a blank View?
2. The FilterTabs component from Task 3 — does it live at `src/components/FilterTabs.tsx`? Should I import it from there?
3. For the 2-column grid, should I use FlatList with `numColumns={2}` or is there a custom grid component already in the project?
4. When the user switches filter tabs, should the filtered list animate in or just re-render immediately?
5. Should the empty state render as a ListEmptyComponent inside the FlatList, or as a conditional outside it?

---

## Files the Agent Should Read First

- `src/hooks/useWatchlist.ts` — to understand the data shape and available functions
- `src/components/WatchlistCard.tsx` — to know what props the card expects before rendering it in the grid
- `src/components/FilterTabs.tsx` — to know what props it accepts (activeTab, onTabChange)
- `src/screens/HomeScreen.tsx` — to match the existing screen structure and header pattern
- `src/navigation/BottomTabNavigator.tsx` — to confirm the screen is already registered

---

## Plan Steps Before Writing Code

**Step 1 — Scaffold the screen file**
Create `src/screens/WatchlistScreen.tsx` with a basic View wrapper. Import `useWatchlist` hook. No UI yet, just confirm the file structure matches `HomeScreen.tsx`.

**Step 2 — Wire up the hook and filter state**
Pull `watchlist` from `useWatchlist`. Add a local `activeTab` state (default: `'All'`). Derive `filteredList` using `useMemo` — filters watchlist by genre when tab is Movies or Series, returns full list when All is selected.

**Step 3 — Build the header**
Add the "YOUR COLLECTION" label and "My Watchlist" heading using the same text style pattern as HomeScreen header. No custom component needed — plain Text elements with StyleSheet styles.

**Step 4 — Drop in FilterTabs**
Render `<FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />` below the header. Confirm the tab switching updates `filteredList` correctly before moving on.

**Step 5 — Render the grid**
Add a `FlatList` with `data={filteredList}`, `numColumns={2}`, `renderItem` rendering `WatchlistCard`. Pass `onRemove` and `onDetailsPress` callbacks. Add `keyExtractor` using `item.id`.

**Step 6 — Handle empty state**
Use `ListEmptyComponent` prop on FlatList to render `WatchlistEmptyState`. This handles both a genuinely empty watchlist and a filtered result with no matches.

---

## What the Agent Should NOT Do in This Task

- Do not create a new navigation file or modify `BottomTabNavigator.tsx`
- Do not add any new packages
- Do not build the `WatchlistEmptyState` component — just reference it as an import placeholder
- Do not add pull-to-refresh or loading states



# .cursor/rules Additions — Watchlist Feature

---

## Rule 1 — Watchlist data must only be accessed through `useWatchlist`

```
Any component that needs to read or modify the watchlist must import and use the useWatchlist hook from src/hooks/useWatchlist.ts. Never manage watchlist state locally inside a screen or component. Never pass the raw watchlist array as a prop down more than one level.
```

**Reasoning:**
Without this rule, Cursor will sometimes take a shortcut — especially inside WatchlistScreen — and manage a local copy of the list with its own useState rather than calling the hook. This creates two sources of truth and breaks add/remove behaviour on other screens. This rule enforces a single data layer from the start.

---

## Rule 2 — `WatchlistCard` must never call `useWatchlist` directly

```
WatchlistCard is a presentational component.
It must receive all data and actions via props (item, onRemove, onDetailsPress).
It must not import or call useWatchlist internally.
```

**Reasoning:**
Cursor tends to make components self-sufficient by wiring up hooks inside them when it sees the opportunity. For WatchlistCard this would be wrong — the card is a pure UI component that just renders what it is given. If it calls the hook directly, it becomes impossible to reuse in other contexts (e.g. a search result list) and much harder to test in isolation.

---

## Rule 3 — All styles must use `StyleSheet.create` — no inline styles

```
All component and screen styles in this feature must be defined using StyleSheet.create at the bottom of the file. No inline style props are allowed (e.g. style={{ marginTop: 8 }} is not allowed). This applies to WatchlistCard, FilterTabs, WatchlistScreen, and WatchlistEmptyState.
```

**Reasoning:**
Cursor almost always generates inline styles when building UI quickly — it is the path of least resistance. In a production React Native codebase inline styles are a performance and consistency problem. This rule needs to be explicit because Cursor will not follow it by default, and fixing styles scattered across JSX after the fact is time-consuming.

--------------------

# AI Failure Anticipation — Watchlist Feature

---

## Failure 1 — Duplicate entries in the watchlist on `addToWatchlist`

**What AI will likely get wrong:**
When generating the `addToWatchlist` function inside `useWatchlist`, Cursor may write a straightforward `setWatchlist([newItem])` without checking if the title already exists. This means tapping the add button twice — or tapping it on a title already saved — will push duplicate entries into the list. The UI will show the same movie twice in the grid with no obvious error.

**How to catch it in review:**
After it completes the task 1, we will read the `addToWatchlist` function directly and look for a duplicate check before the state update. If there is no check on the existing array, the bug is there.

**Follow-up prompt to fix it:**
```
The addToWatchlist function in useWatchlist.ts does not check for duplicates before adding. Update it so that it only adds a title if no item with the same id already exists in the watchlist array. Use Array.some() for the check. Do not change anything else in the file.
```

## Failure 2 — Filter tabs show empty grid instead of filtered results

**What AI will likely get wrong:**
When building the filter logic, Cursor will try to filter the watchlist using the genre field since that is the only content-type related field it sees in the data model. So tapping Movies will try to match items where genre equals "Movies" — but genre holds values like "Sci-Fi" or "Drama", not content types. The grid goes empty and the feature appears broken, even though the data is all there.

**How to catch it in review:**
We will catch this by tappung each filter tab on the screen and observe the grid. If switching to Movies or Series empties the grid despite items being present, this is the failure. The root cause is that the data model has no clear way to distinguish a movie from a series — Cursor will not flag this, it will just pick the wrong field and move on.

**Follow-up prompt to fix it:**
Ask Cursor to add a `contentType` field (`movie` or `series`) to the data model and update the filter logic to use that field instead of genre. Scope the fix to the data model and the filter logic only — nothing else should change.

--------------------------------------------

# One Thing I Learned

The idea that stuck with me most from the readings was **fix the input, not the output.**

Fixing the prompt or updating the rules file feels slower in the moment, but it actually compounds — every improvement you make benefits every future task, not just the current one.

Also one more thing I learned from the Phase 1, is to use Plan Mode. I have used cursor in last project, but didn't try plan mode, it can really help to develop a complex feature with edge case handling, if planned with cursor properly.

This reading made me realise that in AI-first development the thing you own is not the code — it is the instructions that produce the code. That is a bigger mindset shift than I expected going into this.