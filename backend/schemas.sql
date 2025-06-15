
CREATE TABLE Set (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    release_date DATE
);

CREATE TABLE Card (
    id UUID PRIMARY KEY,
    name VARCHAR,
    setId UUID REFERENCES Set(id),
    rarity VARCHAR (50),
    card_number VARCHAR(20)
);

CREATE TABLE Users (
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    joined_at DATE,
    bio TEXT
);

CREATE TYPE listingStatus AS ENUM ('Active', 'Sold');
CREATE TABLE Listings (
    id UUID PRIMARY KEY ,
    cardId UUID references Card(id),
    sellerId UUID references Users(id),
    price DECIMAL NOT NULL ,
    quantity INT,
    created_at timestamp,
    status listingStatus
);

CREATE TYPE transactionStatus AS ENUM ('Pending', 'Completed', 'Cancelled');
CREATE TABLE Transaction (
    id UUID PRIMARY KEY ,
    buyerId UUID references Users(id),
    listingId UUID references Listings(id),
    sale_price DECIMAL,
    quantity INT,
    status transactionStatus,
    purchase_date TIMESTAMP
);