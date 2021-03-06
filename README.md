# Chat App Using ReactJs, Redux And SocketIO
Апп ийг 1 долоо хоногийн дотор хийж гүйцэтгэх байсан ба 5 хоногийн дотор үндсэн шаардлагуудыг дуусгасан болно. Энэхүү апп-ыг хийж үзэх болсон шалтгаан SocketIo судлах түүний тухай суралцах байв.

![alt text](./screenshots/images/1.png)

### Чат апп-ын шинж чанарууд:
1. Хэрэглэгч бүртгэл. 👌
1. Профайлын зураг өөрчлөх. 👌
1. Mongo Database холболт болон тохиргоо. 👌
1. Найз нэмэх, найз болох хүсэлт зөвшөөрөх, цуцлах 👌
1. SocketIO г ашигласан real-time чат /one - to - one/ 👌
1. Чат нь Emoji дэмжинэ.

### Front-end талд ашигласан пакет-ууд
1. ReactJs /Component cуурьтай UI пакет/
1. ReduxJs
1. Bootstrap
1. Bootstrap-react /components/
1. Axios /Хүсэлт илгээх пакет/ 
1. Socket.io-client /socket.io сервертэй холбогдоход ашиглана/ гэх мэт байна.

### Back-end талд ашигласан пакет-ууд
1. ExpressJs /Nodejs сервер/
1. PassportJs /Session authentication хийхэд ашигласан/
1. connect-redis /socketIO дээр authentication шалгахад session-г дундын байдлаар хадгалах хэрэг гарсан ба redis (key-value pair хадгалахад хамгийн хурдан) ашигласан /
1. Mongoose /MongoDb тэй ажиллахад ашигласан/
1. SocketIo /сүлжээнд full-duplex холболт үүсгэхэд ашигладаг ба энгийн REST API-уудаас хурдан ажилладаг./

> `SocketIo -г ашигласнаар server дээр болж буй өөрчлөлтүүдийг front-end талтай хүссэнээрээ холбогдох. Front-end талыг серверээр дамжуулж хүссэнээрээ өөрчлөх боломжтой юм.`

### Install болон Орчин бүрдүүлэх
1. [MongoDB суулгах](https://docs.mongodb.com/manual/administration/install-community/)
1. [Redis сервер суулгах](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

### Ажиллуулах заавар
Ажиллуулахаасаа өмнө 4001 болон 3000 портууд ашиглах боломжтой байгааг шалгаарай!
```console
git clone https://github.com/Daornit/chat-app.git
cd chat-app/back-end/
npm install
npm start
```

```console
cd chat-app/front-end/
npm install
npm start
```

Ашиглаж байсан Node version(v12.16.1), Npm version(6.13.4)