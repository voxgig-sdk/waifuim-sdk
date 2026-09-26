package core

type WaifuimError struct {
	IsWaifuimError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWaifuimError(code string, msg string, ctx *Context) *WaifuimError {
	return &WaifuimError{
		IsWaifuimError: true,
		Sdk:              "Waifuim",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WaifuimError) Error() string {
	return e.Msg
}
