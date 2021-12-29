# User Schema 

- Name
- Type [ admin, skiller , buyer ]
- Profile Picture
- Description
- Whatsapp
- Join Date
- Email
- Bkash
<!-- - Requests - an array to handle the buyers' proposals -->
- Accepted Proposals - can't be more than 5
- Price [ For small , medium  , large project ] ?? - should it be an array
- Multiple skill / Link Another Profile ?? 

--------------------------------------------------------------

# Order Schema

- Order Status [ Requested , Accepted , Completed ]
- Project Size
- Price
- Duration
- Skiller 
- Buyer


--------------------------------------------------------------

# Review Schema

- Buyer 
- Skiller
- Review
- Rating

--------------------------------------------------------------

# Transaction Schema

- Order Id
- Payer Id [ Buyer , Admin ] [ admin might return the money if reported ]
- Transaction Id

--------------------------------------------------------------

# Category Schema
--------------------------------------------------------------

- category name
- Sub types

--------------------------------------------------------------

# Portfolio Schema

- Size [ S , M  , L ]
- Link / File ?? 
- Description
- Skiller
- Category

--------------------------------------------------------------

# Notification Schema

- Type
    * X has requested your service
    * Y has accepted your offer
    * Cancellation / Denial of proposal
    * more to be added
- User Id
- Notification Date
- Status [ Seen , Unseen ]

--------------------------------------------------------------

# Report Schema

- Order
- Report Issuer
- Issue Date
- Status [ Incomplete , Handled ]
- Report Description