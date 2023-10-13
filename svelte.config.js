import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
   preprocess: vitePreprocess({
      style: {
         css: {
            postcss: join(__dirname, 'postcss.config.js')
         }
      }
   }),
   kit: {
      adapter: adapter(),
      alias: {
			'$src/*': '/src/*'
		}
      // csp: {
		// 	directives: {
		// 		'script-src': ['self', 'https://laroastingco.com/', 'https://challenges.cloudflare.com/', 'https://js.stripe.com/'],
		// 		'img-src': ['self', 'https://laroastingco.com/', 'data:', process.env.PUBLIC_S3_URL, 'https://challenges.cloudflare.com/', 'https://js.stripe.com/'],
		// 	}
		// }
   },
}

export default config
