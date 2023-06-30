import { rest } from 'msw'
import listData from '../../Data/ListData'
import CurrentTime from '../../../Utils/CurrentTime'

export const post_Register = [
	rest.post('/register', (req, res, ctx) => {
		const { data } = req.body

		const {
			category,
			contents,
			expectedPeriod,
			personnelNumber,
			title,
			writer,
		} = data

		const realData = {
			postId: Math.floor(Math.random() * 9999) + 1,
			title,
			contents,
			category,
			writer,
			writeDate: CurrentTime(),
			postStatus: '모집중',
			hits: '4',
			likes: '2',
			personnelNumber,
			expectedPeriod,
			profile: {
				fileFullPath:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbiQdhWxfSe3uKwTyX4EK_JPrS7wppr6p6FA&usqp=CAU', // 예시) D://project/file
				originalName: '파일 이름',
			},
			commentCount: 0,
			comments: [],
		}

		listData.response.unshift(realData)
		return res(ctx.status(200), ctx.json())
	}),
]
