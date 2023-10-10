import colors from 'colors'
import 'dotenv/config' //! --> "Do not change"
import app from './app'

colors.setTheme({
  customServer: ['rainbow', 'underline', 'bold', 'bgBlack'],
  msgServer: ['bgGreen', 'brightGreen', 'underline', 'italic'],
  customDB: ['rainbow', 'underline', 'bold', 'bgBlack'],
  msgDB: ['bgYellow', 'brightYellow', 'underline', 'italic'],
  error: ['bgRed', 'brightRed', 'underline', 'italic', 'bold'],
  errorTxt: ['bgBlack', 'red', 'underline', 'italic', 'bold'],
})

app.listen(process.env.PORT, () => {
  console.log(
    // @ts-ignore
    `${' Server listening on '.msgServer} ${
      (process.env.PORT as any).customServer
    } 🚀`
  )
})
