import AdminLayout from './admin-layout';
import DefaultLayout from './default-layout';

AdminLayout.install = (Vue) => Vue.component(AdminLayout.name, AdminLayout);
DefaultLayout.install = (Vue) => Vue.component(DefaultLayout.name, DefaultLayout);

export { AdminLayout, DefaultLayout };