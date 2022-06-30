# Redux API: Contact Manager - React + Redux + RestAPI

- Add New Contact
  - Avatar generator
  - Input fields validated by zod
- Edit Contact
- Delete Contact

Features

- Toggle Contact as Favorite - On/Off
- Archive/UnArchive or Hide Contact - not visible from "All Contact"
- React Router - Filter:

  - All contacts
    - Sort toggle by id - asc/des
  - Favorites
  - Archived or Hidden contact

- Responsive UI

  - XS, SM, MD, LG and XL

- Notification System
  - Implemented via Middleware
  - 5 types
    - Request: "Working..."
    - Add: "New Contact created"
    - Edit: "Contact details updated"
    - Delete: "Contact has been deleted"
    - Toggle/Archive: "Contact has been updated"
