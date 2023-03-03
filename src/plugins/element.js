import Vue from 'vue';
import {
    Pagination,
    Dialog,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    Option,
    Button,
    Table,
    TableColumn,
    DatePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Backtop,
    Drawer,
    Empty,
    Loading,
    MessageBox,
    Message,
    Avatar,
    Notification
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Backtop);
Vue.use(Drawer);
Vue.use(Empty);
Vue.use(Avatar);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
