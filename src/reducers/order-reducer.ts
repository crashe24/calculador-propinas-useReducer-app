import { MenuItem, OrderItem } from "../types/index";


//1 actions 
export type OrderActions = 
{ type: 'add-item', payload: {item: MenuItem}} |
{ type: 'remove-item', payload: {id: MenuItem['id']}} |
{ type: 'add-tip', payload: {value: number}} |
{ type: 'place-order'} 


//2 state 
export type OrderState = {
    order: OrderItem[],
    tip: number
}
// 3 initital state
export const initialState: OrderState = {
    order:[],
    tip: 0
}

// 4. Reducer
export const orderReducer = (
    state: OrderState = initialState,
    actions: OrderActions
) => {
    if (actions.type === 'add-item') {
        
        let updatedOrder: OrderItem[] = []
        const itemExist = state.order.find(orderItem => orderItem.id === actions.payload.item.id)
        
        if(itemExist) {
            updatedOrder = state.order.map( orderItem => orderItem.id === actions.payload.item.id ? 
                {...orderItem, quantity: orderItem.quantity + 1 } : 
                orderItem
            )
        } else {
            const newItem : OrderItem  = {...actions.payload.item, quantity: 1}
            updatedOrder = [...state.order, newItem]
        }
        return {
            ...state,
            order: updatedOrder
        }
    }
    if (actions.type === 'remove-item') {
        let deleteOrder:OrderItem[] = state.order.filter(item => item.id !== actions.payload.id)
        return {
            ...state,
            order: deleteOrder
        }
    }
    if (actions.type === 'add-tip') {
        return {
            ...state,
            tip: actions.payload.value
        }
    }
    if (actions.type === 'place-order') {
        return {
            ...state,
            order: [],
            tip: 0
        }
    }

    return state 
}