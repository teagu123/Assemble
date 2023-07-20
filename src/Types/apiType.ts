import { AxiosResponse } from 'axios'
import { response } from './dataType'

//디테일 페이지 api type
type PostData = {
	postId: number
}

type CommentData = {
	commentContents: string
	userId: number
	postId?: number
}

export type DetailApiType = {
	getDetail(params: PostData): Promise<AxiosResponse<response>>
	Comments(data: any): Promise<AxiosResponse<CommentData>>
}

//디테일 페이지 post 댓글
export type postComment = {
	data: {
		commentContents: string
		userId: number
		postId?: number | null
	}
}

export type PostLike = {
	postId?: number
	userId?: number
}

//리스트 페이지 api type
type GetListData = {
	pageNumber?: number
	searchBy?: string
	searchQuery?: string
	// category?: 'study' | 'project'
	// filter?: 'total' | 'like' | 'popular'
	response?: []
}
export type DeletePost = {
	postId?: number
}

export type ListApiType = {
	getList(params: GetListData): Promise<AxiosResponse<GetListData>>
	DeletePost(params: DeletePost): Promise<AxiosResponse<DeletePost>>
	PostLike(params: PostLike): Promise<AxiosResponse<PostLike>>
}

//등록 페이지 api type
export type PostRegisterData = {
	categoryId?: 'study' | 'project' | string
	contents?: string
	expectedPeriod?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | string
	personnelNumber?: 0 | 2 | 3 | 4 | 5 | 10 | number
	title?: string
	writer?: string
}
export type PostRegister = {
	category: 'study' | 'project' | string
	contents: string
	expectedPeriod: '0' | '1' | '2' | '3' | '4' | '5' | '6' | string
	personnelNumber: 0 | 2 | 3 | 4 | 5 | 10 | number
	title: string
	writer: string
}
export type MutateRegisterData = {
	data: PostRegisterData
}
export type MutateRegisterDataTest = {
	data: MutateRegisterData
}
export type RegisterApiType = {
	data: PostRegisterData
}

//User api type
export type signUpData = {
	email?: string
	name?: string
	nickname?: string
	password?: string
	birthDate?: string
	phoneNumber?: string
}

export type LoginData = {
	email?: string
	password?: string
	token?: string
	// 보류
	response?: any
}
type EmailValidation = {
	email?: string
}
type NicknameValidation = {
	nickname?: string
}

//보류
export type UserApiType = {
	// SignUp(
	// 	email?: string,
	// 	name?: string | undefined,
	// 	nickname?: string | undefined,
	// 	password?: string,
	// 	birthDate?: string,
	// 	phoneNumber?: string,
	// ): Promise<AxiosResponse<signUpData>>
	SignUp(data: signUpData): Promise<AxiosResponse<signUpData>>
	Login(data: LoginData): Promise<AxiosResponse<LoginData>>
	getEmailValidation(
		data: EmailValidation,
	): Promise<AxiosResponse<EmailValidation>>
	getNickNameValidation(
		data: NicknameValidation,
	): Promise<AxiosResponse<NicknameValidation>>
}
