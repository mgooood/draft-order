# Fantasy Football Draft Position Selection - Decision Outline

## Project Overview
Web application to replace chaotic email threads for fantasy football draft position selection process.

## Critical Decisions (In Order)

### 1. Project Name & Identity
**Decision Needed**: Final project name
**Options**: 
- DraftCoordinator
- SnakePick
- DraftFlow
**Impact**: Branding, domain, repository naming
**Status**: 

### 2. Core User Flow (MVP)
**Decision Needed**: Exact steps users take
**Must Define**:
- How admin creates league
- How coaches join/access
- Selection process mechanics
- What happens after all selections made
**Impact**: Determines all development priorities
**Status**: 

### 3. Technology Stack
**Decision Needed**: Frontend + Backend + Database
**Constraint**: Must be simple for MVP, mobile-first
**Options**: 
- Next.js + Vercel + PlanetScale
- React + Node.js + PostgreSQL
**Impact**: Development speed, hosting costs, complexity
**Status**: 

### 4. Visual Theme Direction
**Decision Needed**: Overall look and feel
**Options**:
- Modern/Clean (ESPN-like)
- Fantasy/Gaming themed
- Classic Football
**Impact**: UI kit choice, color palette, typography
**Status**: 

### 5. UI Framework/Kit
**Decision Needed**: How to achieve professional design quickly
**Constraint**: Must support mobile-first, accessibility
**CHOSEN**: **Tailwind CSS + Headless UI + Heroicons**

**Components:**
- **Tailwind CSS**: Utility-first styling, mobile-first responsive
- **Headless UI**: Unstyled accessible components (React/TypeScript)
- **Heroicons**: Consistent icon library
- **Custom Components**: Fantasy-themed elements built on top

**Benefits:**
- Free and professional
- Complete design control for fantasy theme
- Excellent accessibility built-in
- Perfect for dark gaming aesthetic
- Mobile-first responsive utilities

**Impact**: Development speed, design consistency
**Status**: 

## All Critical Decisions Complete! 

### **Project Summary: DraftOrder**
- **Name**: DraftOrder
- **User Flow**: Admin setup → Coach selection → Real-time updates → Final order
- **Tech Stack**: React + TypeScript + AWS (Lambda/DynamoDB) + Polling
- **Theme**: Fantasy Gaming + Football Context
- **UI Kit**: Tailwind + Headless UI + Heroicons

## Next Action
**Ready to begin development**: Create project structure and start building the MVP.

## Secondary Decisions (Later)
- Hosting platform details
- Database schema specifics
- Authentication method
- Real-time update mechanism
- Case study documentation format

## Case Study Notes

### **Key Architectural Decision: Future-Proof Real-Time Strategy**
**Problem**: Need real-time updates but want to start simple for MVP
**Solution**: Abstract real-time logic into swappable adapters
**Business Impact**: 
- Faster MVP delivery (polling is simpler)
- Lower technical risk
- Easy upgrade path when needed
- Demonstrates forward-thinking architecture

**Technical Implementation**:
- Custom React hook abstracts real-time logic
- Event-driven state management
- Adapter pattern for easy swapping
- Zero component changes when migrating

**Portfolio Value**: Shows ability to balance immediate needs with future scalability

## Implementation Decisions

### Draft Order Logic

**CHOSEN**: Custom draft order based on previous year's results

**Logic**:
- 4th place from last year picks first
- 5th, 6th, etc. pick next in ascending rank order
- 3rd place picks third-to-last
- 2nd place picks second-to-last
- 1st place picks last
- New coaches (rank 0) pick after all ranked coaches

**Implementation**:
- Custom sorting algorithm in SelectionOrderList component
- Special handling for top 3 finishers with reversed ordering
- Ability for commissioner to mark new coaches with rank 0

### Backend Integration Approach

**CHOSEN**: Service layer abstraction for seamless backend integration

**Current Mock Implementation**:
- Service functions that mimic API calls
- Isolated data operations from UI components
- Proper async handling to simulate real API behavior

**Example**:
```typescript
// Service function
async function updateCoachSelection(leagueId, coachId, position) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Update data and return result
  // ...
}

// Component usage
const handleSelectPosition = async (position) => {
  try {
    const updatedLeague = await updateCoachSelection(
      league.id, coachId, position
    );
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

**Future Backend Integration**:
- Replace mock service functions with actual API calls
- Maintain the same function signatures
- Add proper authentication and error handling
- Use React state management instead of page refreshes

