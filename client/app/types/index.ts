export type IUser = {
  id :string  
  username :string 
  fullname :string 
  email :string 
  password :string 
  role :string
  shops: IShop[]
  orders: IOrder[]
  cart: ICart 
  createdAt: Date
  updatedAt: Date
}

export type IProduct = {
  id :string  
  name :string
  description :string
  price: number 
  images :string[]
  category :string
  stock: number
  shop: IShop 
  shopId :string
  order: IOrderItem[]
  cartItems: ICartItem[]
  createdAt: Date
  updatedAt: Date
}
export type IJSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: IJSONValue }
  

export type IShop = {
  id :string  
  name :string 
  description :string
  logo :string | null
  category :string
  owner : IUser 
  products: IProduct[]
  userId  :string
  location :string | null
  transaction_details: IJSONValue
  status :string
  createdAt: Date
  updatedAt: Date
}

export type IOrder = {
  id :string  
  status   :string
  items:  IOrderItem[]
  user :  IUser
  userId :string
  payment:  IPayment
  createdAt: Date
  updatedAt: Date
}

export type IPayment = {
  id :string  
  order: IOrder 
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
  rawCallback:        IJSONValue| null         // Full raw response or callback

  createdAt: Date
  updatedAt: Date
}

export type IOrderItem = {
  id :string 
  order : IOrder 
  orderId :string
  quantity : number
  product : IProduct 
  productId :string
  createdAt :Date 
  updatedAt :Date 
}
export type ICart = {
   id        :string   
  userId    :string    
  user      : IUser      
  items     : ICartItem[]
  createdAt :Date  
  updatedAt :Date  
}
export type ICartItem = {
  id        :string    
  cartId    :string
  cart      : ICart      
  product   : IProduct   
  quantity  : number       
  createdAt :Date 
  updatedAt : Date 

}


