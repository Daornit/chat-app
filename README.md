# Chat App Using ReactJs, Redux And SocketIO
Апп ийг 1 долоо хонгийн дотор хийж гүйцэтгэх байсан ба 5 хонгийн дотор үндсэн шаардлагуудыг дуусгасан болно. Энэхүү апп-ыг хийж үзэх болсон шалтгаан SocketIo судлах түүний тухай суралцах байв.

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
1. Socket.io-client /socket.io сервертэй холбогдорход ашиглана/ гэх мэт байна.

### Back-end талд ашигласан пакет-ууд
1. ExpressJs /Nodejs сервер/
1. PassportJs /Session authentication хийхэд ашигласан/
1. connect-redis /socketIO дээр authentication шалгахад session-г дундын байдлаар хадлагах хэрэг гарсан ба redis (key-value pair хадгалхад хамгийн хурдан) ашигласан /
1. Mongoose /MongoDb тэй ажиллахад ашигласан/
1. SocketIo /сүлжээнд full-duplex холболт үүсгэхэд ашигладаг ба энгийн REST API-уудаас хурдана ажилдаг./

> `SocketIo -г ашигласанаар server дээр болж буй өөрчлөлтүүдийг front-end талтай хүссэнээрээ холгодох. Front-end талийг серверээр дамжуулж хүссэнээрээ өөрчлөх болможтой юм.`

### Install болон Орчин бүрдүүлэх
1. [MongoDB суулгах](https://docs.mongodb.com/manual/administration/install-community/)
1. [Redis сервер суулгах](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

### Ажлуулах заавар
Ажлуулхаасаа өмнө 4001 болон 3000 портууд ашиглах боломжтой байгааг шалгаарай!
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