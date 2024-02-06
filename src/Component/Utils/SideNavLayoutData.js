import {FaUserFriends} from "react-icons/fa";
import {MdDashboardCustomize} from "react-icons/md";
import {TbBrandBooking} from "react-icons/tb";
import {MdDesignServices} from "react-icons/md";
import {CgPlayListAdd} from "react-icons/cg";
import {AiOutlineHome} from "react-icons/ai";


export const SideNavLayoutData = [

    {
        title:"Dashboard",
        icons :<MdDashboardCustomize/>,
        link :"/dashboard"
    },

    {
        title:"Receipts",
        icons :<CgPlayListAdd/>,
        link :"/dashboard/receipt"
    },
    {
        title:"Account Info",
        icons :<TbBrandBooking/>,
        link :"/dashboard/accountinfo"
    },
    // {
    //     title:"FAQ's",
    //     icons :<TbBrandBooking/>,
    //     link :"/faq"
    // },
    {
        title:"Contact Us",
        icons :<TbBrandBooking/>,
        link :"/contact"
    },
    {
        title:"Logout",
        icons :<TbBrandBooking/>,
        link :"/login"
    },

 
]