import Home from "@/components/Home"
import Appoint from "@/components/Appoint"
import Cases from "@/components/Cases"
import CaseDetail from "@/components/CaseDetail"
import Contact from "@/components/Contact"
import ShopCart from "@/components/ShopCart"

export default [
    {path: "/",redirect: '/home'},
    {path: "/home",component: Home,name: "home"},
    {path: "/appoint",component: Appoint,name: "appoint"},
    {path: "/cases",component: Cases,name: "cases"},
    {path: "/case/:id",component: CaseDetail,name: "case"},
    {path: "/contact", component: Contact, name: "contact" },
    {path: "/shopcart", component: ShopCart, name: "shopcart" },
    {path:'*',redirect:'/home'}
]