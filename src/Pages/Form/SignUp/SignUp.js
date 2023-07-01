import styled from 'styled-components'
import Input from '../../../Components/Input/Input'
import { FlexColumnCSS, TopPadding } from '../../../Styles/common'
import {
	Date_Icon,
	Email_Icon,
	Lock_Icon,
	Name_Icon,
	Nickname_Icon,
	Phone_Icon,
} from '../../../Components/Icons/Icons'
import { FlexAlignCSS } from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import Notice from './Components/Notice'
import { useForm } from 'react-hook-form'
import { HookFormRule } from '../../../Consts/HookFormRule'
import HookFormError from '../../../Components/Error/HookFormError'
import NotificationModal from '../../../Components/Modal/NotificationModal'
import { useRecoilState } from 'recoil'
import { modalViewNotification } from '../../../Atoms/modalView.atom'
import { useMutation } from '@tanstack/react-query'
import UserApi from '../../../Apis/UserApi'
import { modalViewSuccess } from '../../../Atoms/modalViewSuccess.atom'
import SuccessModal from '../../../Components/Modal/successModal'

function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const [recoilCounter, setRecoilCounter] = useRecoilState(
		modalViewNotification,
	)
	const [recoilSuccessModal, setRecoilSuccessModal] =
		useRecoilState(modalViewSuccess)

	const { mutate, isLoading } = useMutation(data => UserApi.SignUp(data), {
		onSuccess: res => {
			setRecoilSuccessModal(() => true)
		},
		onError: err => {},
	})

	const onSubmit = e => {
		const formData = new FormData()

		formData.append('email', e.SignUpEmail)
		formData.append('name', e.SignUpName.trim())
		formData.append('nickname', e.SignUpNickName.trim())
		formData.append('password', e.SignUpPw)
		formData.append('birthDate', e.SignUpBirthday)
		formData.append('phoneNumber', e.SignUpPhone)

		mutate(formData)
	}

	return (
		<S.Wrapper onSubmit={handleSubmit(onSubmit)}>
			<S.container>
				<h3>회원가입</h3>
				<span>
					<Email_Icon size={'22'} />
					<Input
						placeholder="example@assembled.com"
						{...register('SignUpEmail', HookFormRule.SignUpEmail)}
					/>
				</span>
				{errors.SignUpEmail && (
					<HookFormError>{errors.SignUpEmail.message}</HookFormError>
				)}
				<span>
					<Name_Icon size={'22'} />
					<Input
						placeholder="이름을 입력해주세요"
						{...register('SignUpName', HookFormRule.SignUpName)}
					/>
				</span>
				{errors.SignUpName && (
					<HookFormError>{errors.SignUpName.message}</HookFormError>
				)}
				<span>
					<Nickname_Icon size={'22'} />
					<Input
						placeholder="닉네임을 입력해주세요"
						{...register('SignUpNickName', HookFormRule.SignUpNickName)}
					/>
				</span>
				{errors.SignUpNickName && (
					<HookFormError>{errors.SignUpNickName.message}</HookFormError>
				)}
				<span>
					<Lock_Icon size={'22'} />
					<Input
						placeholder="비밀번호를 입력해주세요"
						{...register('SignUpPw', HookFormRule.SignUpPw)}
					/>
				</span>
				{errors.SignUpPw && (
					<HookFormError>{errors.SignUpPw.message}</HookFormError>
				)}
				<span>
					<Lock_Icon size={'22'} />
					<Input
						placeholder="위에 설정한 비밀번호를 입력해주세요"
						{...register('SignUpPwConfirm', {
							required: '비밀번호 확인을 입력해주세요',
						})}
					/>
				</span>
				{errors.SignUpPwConfirm && (
					<HookFormError>{errors.SignUpPwConfirm.message}</HookFormError>
				)}
				<span>
					<Date_Icon size={'22'} />
					<Input
						placeholder="생년월일(8자리) ex) 19980505"
						{...register('SignUpBirthday', HookFormRule.SignUpBirthday)}
					/>
				</span>
				{errors.SignUpBirthday && (
					<HookFormError>{errors.SignUpBirthday.message}</HookFormError>
				)}
				<span>
					<Phone_Icon size={'22'} />
					<Input
						placeholder="휴대폰 번호를 -없이 입력해주세요"
						{...register('SignUpPhone', HookFormRule.SignUpPhone)}
					/>
				</span>
				{errors.SignUpPhone && (
					<HookFormError>{errors.SignUpPhone.message}</HookFormError>
				)}
				<Notice />
				<S.SignUpButton>로그인</S.SignUpButton>
				{recoilSuccessModal && (
					<SuccessModal text={'회원가입 성공'} url={'/login'} />
				)}
				{recoilCounter && <NotificationModal text={'실패'} />}
			</S.container>
		</S.Wrapper>
	)
}
export default SignUp

const Wrapper = styled.form`
	${TopPadding}
	display: flex;
	justify-content: center;
`
const container = styled.div`
	min-width: 25%;
	h3 {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		margin: 7rem 0 5rem 0;
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	}
	span {
		${FlexAlignCSS}
		width: 100%;
		margin-bottom: 1rem;
		border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	}
	${FlexColumnCSS}
	align-items: center;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 90%;
	}
`
const SignUpButton = styled(Button)`
	margin-top: 2rem;
`

const S = { Wrapper, container, SignUpButton }
