import { styled } from 'styled-components'
import {
	Cancel_Icon,
	Cancel_big_Icon,
	Hamburger_Icon,
} from '../../../../Icons/Icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../Contexts/auth'
import SuccessModal from '../../../Modal/successModal'
import { useMutation } from '@tanstack/react-query'
import UserApi from '../../../../Apis/UserApi'

function Hamburger() {
	const [isView, setIsView] = useState<boolean>(false)
	const location = useLocation()
	const auth = useAuth()
	const navigate = useNavigate()

	const [successModal, setSuccessModal] = useState(false)

	const list = [
		{
			name: '홈',
			url: '/',
		},
		{
			name: '모임 생성',
			url: '/register',
		},
		{
			name: '내가 활동중인 모임',
			url: '/myPage/activity',
		},
		{
			name: '내가 만든 모임',
			url: '/myPage',
		},
		{
			name: '내가 작성한 댓글',
			url: '/myPage/comment',
		},
		{
			name: '내가 관심있는 모임',
			url: '/myPage/likes',
		},
		{
			name: '내 정보 수정',
			url: '/myPage/userSetting',
		},
		{
			name: '로그아웃',
			url: 'logout',
		},
		{
			name: '회원 탈퇴',
			url: '/myPage/withdrawal',
		},
	]
	const { mutate } = useMutation(() => UserApi.postLogout(), {
		onSuccess: () => {
			setSuccessModal(() => true)
			auth.logout()
		},
	})

	useEffect(() => {
		setIsView(false)
	}, [location.pathname])

	const onClickList = (el: string) => {
		if (el === 'logout') return mutate()
		navigate(el)
	}
	return (
		<>
			<S.Wrapper>
				<Hamburger_Icon onClick={() => setIsView(!isView)} />
				{isView && (
					<S.ListBox>
						<div>
							<Cancel_big_Icon onClick={() => setIsView(!isView)} />
						</div>
						{list.map((el, idx: number) => (
							<S.List
								onClick={() => onClickList(el.url)}
								$status={location.pathname === el.url}
								key={idx}
							>
								{el.name}
							</S.List>
						))}
					</S.ListBox>
				)}
				{successModal && (
					<SuccessModal
						text={'로그아웃 되었습니다.'}
						setState={setSuccessModal}
					/>
				)}
			</S.Wrapper>
		</>
	)
}
export default Hamburger

const Wrapper = styled.div`
	position: relative;
	display: none;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		display: block;
	}
`
const ListBox = styled.ul`
	position: absolute;
	width: 50vw;
	height: 100vh;
	top: -1.5rem;
	right: -3rem;
	background-color: ${({ theme }) => theme.COLOR.orange};
	padding-top: 3rem;
	opacity: 0.9;
	animation: hamburger 1s ease;
	animation-duration: 0.4s;
	animation-timing-function: ease;
	@keyframes hamburger {
		0% {
			transform: translateX(60%);
		}
		100% {
			transform: translateX(0);
		}
	}
	& > div {
		text-align: end;
		padding-right: 3rem;
	}
`
const List = styled.ul<{ $status: boolean }>`
	margin: 1.2rem 0;
	padding: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.xslarge};
	background-color: ${({ theme, $status }) =>
		$status ? theme.COLOR.sub : 'none'};
`

const S = { Wrapper, ListBox, List }
