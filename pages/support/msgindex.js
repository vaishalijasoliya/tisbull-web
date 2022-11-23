import React, { useEffect, useState, useRef } from 'react';

import Grid from '@mui/material/Grid';
import { Box, grid } from '@mui/system';
import { Avatar, Link, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styles from '../../styles/support.module.css';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
// import { log } from 'console';
import moment from 'moment';
// import { saveAs } from 'file-saver'
// import FileSaver from 'file-saver';
import DownloadLink from "react-download-link";
import axios from 'axios'
import fileDownload from 'js-file-download'


const SupportMessages = (props) => {
    const router = useRouter();



    console.log(props, 'propsmsg');
    const [dataMessages, setDataMessages] = useState();
    const [supportDetail, setSupportDetail] = useState();
    const [message, setMessage] = useState('')
    const [checked, setChecked] = useState(false)
    const [imagePreview, setimagePreview] = useState([]);
    const csvLinkRef = useRef();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [idItem, setIdItem] = useState([])


    useEffect(() => {
        //setimagePreview('');
        if (!!props.viewSupportList && dataMessages != props.viewSupportList) {
            console.log(props.userDetail, 'props.viewSupportList.data');
            setDataMessages(props.viewSupportList)
            setSupportDetail(props.userDetail)
            var supportStatus = props.userDetail.status == 'complete' ? true : false
            setChecked(supportStatus)
            setimagePreview([]);
            setIdItem([]);
            setMessage('')
        }
    });
    // if (!!props.viewSupportList && dataMessages != props.viewSupportList) {
    //     console.log(props.userDetail, 'props.viewSupportList.data');
    //     setDataMessages(props.viewSupportList)
    //     setSupportDetail(props.userDetail)
    //     var supportStatus = props.userDetail.status == 'complete' ? true : false
    //     setChecked(supportStatus)
    // }
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    const handleChangeCheck = () => {
        console.log(checked, 'checked');
        updateTicket(checked)
        setChecked(!checked);
    }
    const handleSelect = (index) => {
        setStatus(e)
    }

    const messageWrite = (e) => {
        setMessage(e.target.value);
    }

    const handleChangePdf = (e) => {
        console.log(e.target.files[0]);
        //setFile(URL.createObjectURL(e.target.files[0]));
        uploadItem(e.target.files[0], 'pdf')
    }

    const handleChangeImage = (e) => {
        console.log(e.target.files[0]);
        //setFile(URL.createObjectURL(e.target.files[0]));
        uploadItem(e.target.files[0], 'image')
        setSupportDetail(props.userDetail)

    }

    const updateTicket = async (status) => {
        var body = (status == true) ? "incomplete" : "complete"
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.profile.token
        }
        var body = {
            status: body,
            id_support: props.userDetail.id,
        }
        props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.UPDATE_TICKET, JSON.stringify(body), headers);
        props.props.loaderRef(false)
        // console.log(data, "data")
        if (!!data) {
            if (data.status == true) {
                console.log(data, 'datachecked');
            }
        }
    }

    const sendMessage = async () => {
        console.log(idItem, 'idItembefore');
        if (message.length > 0 || idItem.length > 0) {
            var headers = {
                "Content-Type": "application/json",
                "x-access-token": props.props.profile.token
            }
            var body = {
                type: "admin",
                id_support: props.userDetail.id,
            }
            if (message.length > 0) {
                body.description = message
            }
            if (idItem.length > 0) {
                body.id_item = idItem
            }
            console.log(body, 'idItembefore');
            props.props.loaderRef(true)
            var data = await ApiServices.PostApiCall(ApiEndpoint.SEND_MESSAGE, JSON.stringify(body), headers);
            props.props.loaderRef(false)
            // console.log(data, "data")
            if (!!data) {
                if (data.status == true) {
                    setMessage('')
                    setIdItem([])
                    props.viewSupport(props.userDetail.id)
                }
            }
            var path = [...imagePreview]
            path.slice(0, imagePreview.length - 1);
            setimagePreview(path)
        }
    }
    const uploadItem = async (file, type) => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", props.props.profile.token);
        var formdata = new FormData();
        formdata.append("file", file);
        formdata.append("type", type);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        var reader = new FileReader();
        props.props.loaderRef(true);
        const data = await fetch(ApiEndpoint.USER_UPLOAD_IMAGE, requestOptions)
            .then((response) => response.json())
            .then(result => {
                return result
            })
            .catch(error => console.log('error', error));
        props.props.loaderRef(false)
        if (data.status == true) {
            const item = idItem
            item.push(data.data.id)
            setIdItem(item)

            if (type == 'pdf') {
                var objectUrl = '/image/PDF.png';

            } else {
                var objectUrl = URL.createObjectURL(file)
            }
            console.log(objectUrl);
            const path = [...imagePreview]
            path.push(objectUrl);
            setimagePreview(path)
        }
    }
    const downloadCSV = () => {
        console.log('clickced')
        csvLinkRef.current.link.click()
    };

    const download = () => {
        var element = document.createElement("a");
        var file = new Blob(
            [
                "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
            ],
            // { type: "image/*" }
        );
        console.log(file);
        element.href = URL.createObjectURL(file);
        element.download = "image.jpg";
        //element.click();
    };

    const onTestSaveFile = () => {

        var myImage = document.querySelector('img');

        fetch('https://firebasestorage.googleapis.com/v0/b/impressions-convrtx.appspot.com/o/3eca16bfb4fa94c8bf86dc600?alt=media&token=1fa4bc69-dfe8-496a-9ba8-7a80e9844893').then(function (response) {
            return response.blob();
        }).then(function (myBlob) {
            console.log(myBlob, 'myBlob')
            var objectURL = URL.createObjectURL(myBlob);
            myImage.src = objectURL;
        });

        var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
        var file = new Blob(
            [
                "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
            ],
            { type: "image/*" }
        );
        FileSaver.saveAs(file, "image.jpg");
    }

    const Index = () => {
        const downloadImage = () => {
            saveAs('image_url', '/Users/adminstrator/Desktop/Simple-Mockup-Free-Scene-2000x1500.jpeg') // Put your image url here.
        }
        return <Button onClick={downloadImage}>Download test!</Button>
    }
    // const Signin = (props) => {

    console.log(idItem, 'checkitem');
    var todayDate = '';
    const downloadImage = () => {
        saveAs('image_url', '/Users/adminstrator/Desktop/Simple-Mockup-Free-Scene-2000x1500.jpeg') // Put your image url here.
    }

    const downloadImageNew = (e) => {
        console.log(e.target.href);
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "image.png"); //or any other extension
                    document.body.appendChild(link);
                    //link.click();
                    csvLinkRef.current.link.click()
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDownload = (url, filename) => {
        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.addEventListener("readystatechange", function () {
        //     if (this.readyState === 4) {
        //         console.log(this.responseText);
        //     }
        // });

        // xhr.open("GET", "https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg");

        // xhr.send();


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://firebasestorage.googleapis.com/v0/b/impressions-convrtx.appspot.com/o/3eca16bfb4fa94c8bf86dc600?alt=media&token=1fa4bc69-dfe8-496a-9ba8-7a80e9844893", requestOptions)
            .then(response => response.blob())
            .then((result) => {
                console.log(result)
                const results = fileDownload(result, 'filename.png');
                console.log(results)
            }
            )
            .catch(error => console.log('error', error));


    }

    console.log(imagePreview, 'imagePreview')
    return (
        <>

            {supportDetail &&
                <>
                    <div >
                        <Grid container columnSpacing={0} className={styles.maendivcals}  >
                            <Grid item sm={12} md={4} xs={12} display="flex" className={styles.mormalnabar}>
                                <div className="images"></div>
                                <Avatar src={supportDetail.user.profile_photo} />
                                <div className={styles.namewtpp}>
                                    <Typography paragraph className={styles.msgname}>{supportDetail.user.first_name} {supportDetail.user.last_name}</Typography>
                                    <Typography paragraph className={styles.msgemail}>{supportDetail.user.email}</Typography>
                                </div>
                            </Grid>

                            <Grid item sm={12} md={4} xs={12} className={styles.uttaran}>
                                <div className={styles.msgidnabar}>
                                    <Typography paragraph className={styles.nabarwtpp}>
                                        {supportDetail.tickit}
                                    </Typography>
                                    <Typography paragraph className={styles.msgnbarname}>
                                        Ticket No.
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item sm={12} md={4} xs={12} className={styles.msgcekbox} >

                                <FormControlLabel control={<Checkbox checked={checked} onChange={handleChangeCheck} className={styles.cekboxcalar} />} label="Mark as complete" className={styles.cekboxcalar12} />
                            </Grid>
                            <div className={styles.bodarbott}></div>
                        </Grid>
                        {/* <Grid container columnSpacing={0} className={styles.maendivcals33} display={'flex'}>
                <Grid item sm={4} md={5} className={styles.ptext1}>
                </Grid>
                <Grid className={styles.ptext} item sm={4} md={2}>
                    <Typography paragraph className={styles.taeam}> 18 March 2021</Typography>
                </Grid>
                <Grid className={styles.ptext1} item sm={4} md={5}>
                </Grid>
            </Grid> */}
                        <Grid container columnSpacing={0} className={styles.maendivcals23 + " " + styles.chatright} display={'flex'}>


                            {!!dataMessages ? dataMessages.data.map((row, index) => {

                                const { userDetail, description, createdAt, itmeList, id_sender } = row;
                                const { profile_photo } = userDetail;
                                let datechat = "";
                                const customClass = (id_sender == dataMessages.id_user) ? styles.messageleft : styles.messageright;
                                if (todayDate != moment(createdAt).format('DD ddd YYYY')) {
                                    datechat = moment(createdAt).format('DD ddd YYYY');
                                    todayDate = moment(createdAt).format('DD ddd YYYY');
                                }
                                return (
                                    <>
                                        {!!datechat &&

                                            <Grid container columnSpacing={0} className={styles.maendivcals33} display={'flex'}>

                                                <Grid item sm={4} md={4} className={styles.ptext1}>
                                                </Grid>
                                                <Grid className={styles.ptext} item sm={4} md={4}>
                                                    <Typography paragraph className={styles.taeam}> {moment(createdAt).format('DD ddd YYYY')}</Typography>
                                                </Grid>
                                                <Grid className={styles.ptext1} item sm={4} md={4}>
                                                </Grid>

                                            </Grid>
                                        }
                                        <Grid id="massnum" className={customClass} key={index} item sm={12} md={12} xs={12} >
                                            <Grid id='demolog' className={styles.notdifaend} item sm={12} md={12} xs={12} >
                                                <Avatar src={profile_photo} className={styles.megopohot23} />
                                                <Box style={{ width: 'auto', maxWidth: '80%' }}>

                                                    {!!description ? <div>
                                                        <Box className={styles.msgbox}>
                                                            <Typography paragraph className={styles.typtext1}>
                                                                {description}
                                                            </Typography>
                                                        </Box>

                                                    </div> : ''}

                                                    <Grid key="imagwa-grid" className={styles.imgdunbox12} item sm={12} spacing={3} >
                                                        {(itmeList && itmeList.length > 0) ?
                                                            itmeList.map((row1, index1) => {

                                                                console.log(row1, 'hoiuuuuuu');
                                                                return (
                                                                    <>

                                                                        {row1.type == 'image' ?
                                                                            <>
                                                                                <a href={row1.image} target="_blank" rel="noreferrer">
                                                                                    <Box className={styles.imgdunbox}><img key={index1} src={row1.image} /></Box>
                                                                                    {/* {/ <SaveAltIcon className={styles.ikondonlod} /> /} */}
                                                                                </a>
                                                                            </> : ''}
                                                                        {row1.type == 'pdf' ?
                                                                            <>
                                                                                <a href={row1.image} target="_blank" rel="noreferrer">
                                                                                    <div className={styles.lastbtnmsg}>

                                                                                        <CollectionsIcon className={styles.galari} />
                                                                                        <div className={styles.pakit}>
                                                                                            <Typography paragraph className={styles.pohotlenth}>
                                                                                                PDF
                                                                                            </Typography>
                                                                                            {/* <Typography paragraph className={styles.pohotlenth12}>
                                                                                    350 kb
                                                                                </Typography> */}
                                                                                        </div>

                                                                                        {/* {/ <SaveAltIcon className={styles.ikonenddov} /> /} */}
                                                                                    </div>
                                                                                </a>
                                                                            </>
                                                                            : ''}
                                                                    </>
                                                                )
                                                            })
                                                            : ''}
                                                    </Grid>
                                                    <div className={styles.botollogo}>
                                                        <Typography paragraph className={styles.minith}>
                                                            {moment(createdAt).format('h:mm')}
                                                        </Typography>
                                                    </div>
                                                </Box>




                                            </Grid>
                                        </Grid>


                                    </>

                                )
                            }) : ''
                            }

                        </Grid>
                        <Box className={styles.previewMain}>
                            {

                                // (imagePreview && imagePreview.length > 0) &&
                                // imagePreview.map((row1, index1) => {

                                //     console.log(row1, 'imagePreview');
                                //     return (
                                //         <>
                                //             <img src={row1} alt={index1} />
                                //         </>
                                //     )
                                // })
                            }
                        </Box>
                        <Box className={styles.containerhome + " " + styles.bodarbott12} style={{ display: 'flex', alignItems: 'left' }}>

                            <Box style={{ width: '90%', gap: '15px', display: 'flex' }}>
                                <Button className={styles.uplodpic2}
                                    variant="contained"
                                    component="label"
                                >
                                    <AttachFileIcon className={styles.uplodpic} />
                                    <input
                                        type="file"
                                        hidden
                                        onChange={handleChangePdf}
                                        accept=".pdf,.doc"
                                    />
                                </Button>
                                <Button
                                    className={styles.uplodgalari}
                                    variant="contained"
                                    component="label"
                                >
                                    <CollectionsIcon className={styles.uplodgalari12} />
                                    <input
                                        type="file"
                                        hidden
                                        multiple="true"
                                        onChange={handleChangeImage}
                                        accept=".jpg, .jpeg, .png"
                                    />
                                </Button>
                                <textarea placeholder='Write your message here' className={styles.inputhedar} onChange={messageWrite} value={message} ></textarea>
                            </Box>
                            <Box>
                                <div className={styles.ciriket} onClick={sendMessage} >
                                    <Avatar className={styles.avtarbtn}>
                                        <button className={styles.sendbtn}  >
                                            <SendIcon className={styles.ikonsendbtn} />
                                        </button>
                                    </Avatar>

                                </div>
                            </Box>
                        </Box>

                    </div>
                </>
            }

            <Box className={styles.previewMain}>
                {/* <img src={imagePreview} alt={imagePreview} /> */}
                {

                    (imagePreview && imagePreview.length > 0) &&
                    imagePreview.map((row1, index1) => {

                        console.log(row1, 'imagePreview');
                        return (
                            <>
                                <img src={row1} alt={index1} />
                            </>
                        )
                    })
                }
            </Box>
        </>


    )
}


export default SupportMessages;