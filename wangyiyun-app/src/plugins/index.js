import { Swipe, SwipeItem,Popup,Form, Field, CellGroup,Button  } from 'vant';

let plugins = [
    Swipe, SwipeItem,Popup,Form, Field, CellGroup,Button 
]
export default function getVant(app){
    plugins.forEach((el)=>{
        app.use(el);
    })
}