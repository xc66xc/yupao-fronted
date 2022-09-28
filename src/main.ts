import {createApp} from 'vue'
import {
    Tabbar,
    TabbarItem,
    Icon,
    NavBar,
    Button,
    Search,
    Tag,
    Divider,
    Collapse,
    CollapseItem,
    TreeSelect,
    Col,
    Row,
    Cell,
    CellGroup,
    Form,
    Field,
    Card,
    Empty,
    DatetimePicker,
    Popup,
    Stepper,
    RadioGroup,
    Radio,
    Switch,
    Skeleton
} from 'vant';
import App from './App.vue'

import * as VueRouter from 'vue-router';
import routes from "./config/route";


const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Tag);
app.use(Divider);
app.use(Collapse);
app.use(CollapseItem);
app.use(TreeSelect);
app.use(Col);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(Form);
app.use(Field);
app.use(Card);
app.use(Empty);
app.use(DatetimePicker);
app.use(Popup);
app.use(Stepper);
app.use(Radio);
app.use(RadioGroup);
app.use(Switch);
app.use(Skeleton);
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)
app.mount('#app');


