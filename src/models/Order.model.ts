import { User } from './User.model';
import { Product } from './Product.model';

export default interface Order {
    ID:string,
    user:User,
    products:Product[],
    date_of_order:Date,
    tracking_number:string,
    updates:[],
    Status:string,
    Payment_method:string,
    Total_price:number,
    Address:string,
    City:string,
    Postal_code:string,
    Phone_number:string,
    Note:string,
    Created_at:Date,
    Updated_at:Date
}
