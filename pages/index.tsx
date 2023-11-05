import dynamic from 'next/dynamic'
import Head from 'next/head'
const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

export default function Home() {
	return (
		<>
			<Head>
				<title>Synapses</title>
				<meta
					name="description"
					content="Web-based diagramming and visualization tool for connecting thoughts"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Editor />
			</main>
		</>
	)
}
