
CREATE TABLE Set (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    language VARCHAR(15),
    release_date DATE
);

CREATE TABLE Card (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    set_id UUID REFERENCES Set(id),
    rarity VARCHAR (50),
    card_number VARCHAR(20),
    language VARCHAR(15)
);

CREATE TABLE Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE ,
    password VARCHAR(255) NOT NULL,
    joinedat DATE,
    bio TEXT
);

CREATE TYPE listingStatus AS ENUM ('Active', 'Sold');
CREATE TABLE Listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_id UUID references Card(id),
    seller_id UUID references Users(id),
    price DECIMAL(10, 2) NOT NULL ,
    quantity INT CHECK (quantity > 0),
    created_at timestamp,
    status listingStatus DEFAULT 'Active'
);

CREATE TYPE transactionStatus AS ENUM ('Pending', 'Completed', 'Cancelled');
CREATE TABLE Transaction (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID references Users(id),
    listing_id UUID references Listings(id),
    sale_price DECIMAL(10, 2) NOT NULL ,
    quantity INT CHECK (quantity > 0),
    status transactionStatus DEFAULT 'Pending',
    purchase_date TIMESTAMP DEFAULT now()
);

CREATE TABLE password_reset_token (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(255),
    user_id UUID NOT NULL REFERENCES Users(id),
    expiry_date TIMESTAMP,
    CONSTRAINT ukf90ivichjaokvmovxpnlm5nin UNIQUE (user_id)
);

CREATE INDEX idx_card_name_gin
ON card
USING GIN (to_tsvector('english', name));

CREATE INDEX idx_set_name_gin
ON set
USING GIN (to_tsvector('english', name));

CREATE INDEX idx_card_name_btree ON card(name);
CREATE INDEX idx_card_set_btree ON set(name);