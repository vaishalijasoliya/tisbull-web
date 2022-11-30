import React, { useContext } from 'react'
import SupportContext from "../../context/SupportContext";
import Avatar from '@mui/material/Avatar';
import style from '../../styles/support.module.css'
import BasicTabs from '../../pages/support/supporttab'
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
// import { moment } from 'https://momentjs.com/downloads/moment.js'
import moment from 'moment'

function createData(id: string, message: string, user: object) {
  return { id, message, user }
}

const SupportList = (props : any) => {
  console.log(props, "props11")
  const [supportListData, setSupportListData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true)
  const [resData, setResData] = React.useState('')

  const { activeSupportId, setActiveSupportId, setActiveSupportObject } = useContext(SupportContext);

  // const handleClick = (id: string, data: object) => {
  //   // setActiveSupportId(id)
  //   // setActiveSupportObject(data)
  //   viewSupportMsg(id)

  // }

  // const viewSupportMsg = async (id) => {

  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token
  //   }
  //   var body = {
  //     id_support: id
  //   }
  //   props.props.loaderRef(true)
  //   var data = await ApiServices.PostApiCall(ApiEndpoint.VIEW_SUPPORT_MSG, JSON.stringify(body), headers);
  //   props.props.loaderRef(false)
  //   console.log(data, "111data")
  //   if (!!data) {
  //     if (data.status == true) {
  //       setResData(data)
  //       // getSupportList()
  //     }
  //   }
  // }
  // console.log(resData)

  // const getSupportList = async () => {

  //   var headers = {
  //     "Content-Type": "application/json",
  //     "x-access-token": props.props.profile.token
  //   }
  //   props.props.loaderRef(true)
  //   var data = await ApiServices.PostApiCall(ApiEndpoint.LIST_SUPPORT_TICKET, null, headers);
  //   props.props.loaderRef(false)
  //   console.log(data, "data")
  //   if (!!data) {
  //     if (data.status == true) {

  //       let supportListDataUpdate = [];
  //       data.data.map((result: any) => {
  //         console.log(result, "myresult")
  //         const dataR = {
  //           id: result.id,
  //           message: result.lastMessage,
  //           pendingCount: result.pendingMsgCount,
  //           user: result.userDetail,
  //           datetime: result.lastMessage,
  //         }
  //         supportListDataUpdate.push(dataR)
  //       });

  //       setSupportListData(supportListDataUpdate)
  //       setIsLoading(false)
  //     } else {
        
  //       toast.error(data.message)
  //     }
  //   } else {
  //     toast.error('Something went wrong.')
  //   }
  // }

  // React.useEffect(() => {
  //   getSupportList()
  // }, [])

// 
  return (
    <>

      <BasicTabs />

      <div className="support-list">
        {
          !isLoading ? (
            supportListData && supportListData.length > 0 ? (
              supportListData.map((row: any) => {
                const base64Flag = 'data:image/png;base64,';
                // console.log(row);
                const { id, user, message, pendingMsgCount, pendingCount } = row;

                const date1 = moment(message.createdAt).format('DD-MM-YYYY')
                const date2 = moment().format('DD-MM-YYYY')

                function mydate1() {

                  if (date1 == date2) {
                    console.log(date1 + "today")
                    return (
                      moment(message.createdAt).format('h:mm')
                    )
                  } else {
                    // console.log(date1 + "early")
                    return (
                      date1
                    )
                  }
                }

                const { first_name, last_name, profile_photo, unreadCount, is_online, dateTime, mydatetime } = user;
                // const activeClass = (id == activeSupportId) ? "active" : "";
                return (
                  <>
                    <div className={`support-list-item d-flex align-items-center  `} id={style.left} key={id} 
                    // onClick={() => handleClick(id, row)}
                    >
                      <div className="list-item-left">
                        <Avatar src={!!user.profile_photo ? user.profile_photo : "M"}></Avatar>
                      </div>

                      <div className="list-item-middle flex-fill">
                        <h6 className="username">{first_name} {last_name}</h6>
                        <p className="m-0 latest-message">{message.description}</p>
                      </div>

                      <div className="list-item-right w-25 align-self-start">
                        <p className="m-0 date-time" id={style.datetime}>{mydate1()}</p>
                        {pendingCount > 0 && (
                          <p className="m-0 unread-count" id='ptxt'>{pendingCount}</p>
                        )}
                      </div>

                    </div>

                  </>)
              })
            )
              : (
                <div className='loading'>
                  <h3>User Not Found</h3>
                </div>
              )
          ) : 
          (
            <div className='loading'>
              <h3>Loading...</h3>
            </div>
          )
        }
      </div>

    </>
  )
}

export default SupportList