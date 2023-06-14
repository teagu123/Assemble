import styled, { css } from 'styled-components'

const variantCSS = {
	default: css`
		background-color: ${({ theme }) => theme.COLOR.common.white};
		border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
		&:hover {
			opacity: 0.8;
			transition: all 0.2s ease-in-out;
		}

		&:disabled {
			background-color: ${({ theme }) => theme.COLOR.common.gray[200]};
		}
	`,
	'default-reverse': css`
		border: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};

		background-color: ${({ theme }) => theme.COLOR.common.gray[100]};

		&:hover {
			opacity: 0.7;
			transition: all 0.2s ease-in-out;
		}
	`,
}

const shapeCSS = {
	default: css`
		border-radius: 0.4rem;
	`,
}

const sizeCSS = {
	default: css`
		width: 8rem;
		height: 3.3rem;
	`,

	full: css`
		width: 100%;
		height: 4.8rem;
	`,
	fit: css`
		width: fit-content;
		height: fit-content;
		padding: 0.3rem 1.5rem;
	`,
}

const fontSizeCSS = {
	default: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	`,
	medium: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	`,
	tiny: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	`,
	large: css`
		font-size: ${({ theme }) => theme.FONT_SIZE.large};
	`,
}

export const Button = styled.button`
	${({ variant }) => variantCSS[variant]}
	${({ shape }) => shapeCSS[shape]}
    ${({ size }) => sizeCSS[size]}
	${({ fontSize }) => fontSizeCSS[fontSize]}
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
