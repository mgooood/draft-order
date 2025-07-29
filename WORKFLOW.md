# Draft Order Workflow

## Overview

This document outlines the complete workflow for the fantasy football draft position selection process in the DraftOrder app. The process follows a specific order based on previous year's rankings and manages coach selections in a sequential manner.

## 1. Draft Order Determination

- League is created with coaches who have previous year ranks
- Coaches are ordered for selection based on our custom logic:
  - 4th place picks first
  - 5th, 6th, etc. pick next in ascending order
  - 3rd place picks third-to-last
  - 2nd place picks second-to-last
  - 1st place (champion) picks last
  - New coaches (rank 0) pick after all ranked coaches

## 2. Selection Phase Start

- League enters "in-progress" status
- First coach in the draft order gets their turn
- Available positions are all positions not yet selected (1 through N, where N is the number of coaches)

## 3. Coach Selection Process

1. Current coach sees available draft positions
2. They click on their desired position number
3. System records their selection and links it to their coach profile
4. Selected position becomes unavailable for other coaches

## 4. Turn Advancement

- After a coach selects, the turn advances to the next coach in the draft order
- Current turn indicator updates to show whose turn it is
- This continues until all coaches have selected a position

## 5. Selection Phase Completion

- After the last coach selects, the league status changes to "completed"
- System redirects to results page showing the final draft order selections
- This final draft order will be used for the actual draft

## 6. Data Persistence

- All selections should be saved (to localStorage for now, later to a backend)
- If a user returns to the app, they should see the current state of selections

## Technical Implementation Notes

- The selection process uses React state for immediate UI updates
- Local storage maintains the state between sessions
- Application architecture is designed to easily swap local storage with API calls in the future