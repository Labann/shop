type User = {
  id :string  
  username :string 
  fullname :string 
  email :string 
  password :string 
  role :string
  shops: Shop[]
  orders: Order[]
  cart: Cart 
  createdAt: Date
  updatedAt: Date
}

type Product = {
  id :string  
  name :string
  description :string
  price: number 
  images :string[]
  category :string
  stock: number
  shop: Shop 
  shopId :string
  order: OrderItem[]
  cartItems: CartItem[]
  createdAt: Date
  updatedAt: Date
}
type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

type Shop = {
  id :string  
  name :string 
  description :string
  logo :string | null
  category :string
  owner :User 
  products: Product[]
  userId  :string
  location :string | null
  transaction_details: JSONValue
  status :string
  createdAt: Date
  updatedAt: Date
}

type Order = {
  id :string  
  status   :string
  items:  OrderItem[]
  user :  User
  userId :string
  payment:  Payment
  createdAt: Date
  updatedAt: Date
}

type Payment = {
  id :string  
  order: Order 
  orderId :string 
  method:  string
  status: string 
  amount:  number 
  
  merchantRequestId   :string | null       // From initial STK push response
  checkoutRequestId   :string| null       // From initial STK push response
  mpesaReceiptNumber  :string| null       // From callback
  phoneNumber         :string| null       // Customer phone
  transactionDate     :Date| null     // Parsed from callback YYYYMMDDHHMMSS

  // ===== Card Payment Specific =====
  cardBrand           :string| null       // e.g. "Visa", "MasterCard"
  cardLast4           :string| null       // Last 4 digits of the card
  cardTransactionId   :string| null       // ID from the card processor
  cardHolderName      :string| null       // Name on the card

  // ===== Shared =====
  rawCallback:        JSONValue| null         // Full raw response or callback

  createdAt: Date
  updatedAt: Date
}

type OrderItem = {
  id :string 
  order : Order 
  orderId :string
  quantity : number
  product :Product 
  productId :string
  createdAt :Date 
  updatedAt :Date 
}
type Cart = {
   id        :string   
  userId    :string    
  user      :User      
  items     :CartItem[]
  createdAt :Date  
  updatedAt :Date  
}
type CartItem = {
  id        :string    
  cartId    :string
  cart      : Cart      
  product   : Product   
  quantity  : number       
  createdAt :Date 
  updatedAt : Date 

}


