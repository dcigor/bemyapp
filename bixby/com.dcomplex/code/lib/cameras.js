module.exports = [{
    Id: 75,
    Name: "Street Intersection",
    ServerMotionDetection: 0,
    ServerFaceDetection: 0,
    image: {images: [{url:'/images/cameras/intersection.jpg'}]}
}
,{
    Id: 77,
    Name: "PTZ",
    ServerMotionDetection: 1,
    ServerFaceDetection: 0,
    image: {images: [{url:'/images/cameras/ptz.jpg'}]}
}
,{
    Id: 78,
    Name: "Lab",
    ServerMotionDetection: 0,
    ServerFaceDetection: 0,
    ServerObjectDetection: 0,
    image: {images: [{url:'/images/cameras/lab.jpg'}]}
}
,{
    Id: 79,
    Name: "Street",
    ServerMotionDetection: 1,
    BackgroundSubstractor: 1,
    ServerFaceDetection: 1,
    ServerObjectDetection: 1,
    image: {images: [{url:'/images/cameras/street.jpg'}]}
}, {
    Id: 1,
    Name: "Floor",
    ServerMotionDetection: 0,
    ServerFaceDetection: 1,
    image: {images: [{url:'/images/cameras/street.jpg'}]}
}
];