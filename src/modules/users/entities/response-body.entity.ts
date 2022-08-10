export interface BaseResponseBody {
  transacao: {
    co_transacao_local: string;
    dt_transacao_local: Date;
  };
}

export interface ResponseBody extends BaseResponseBody {
  dado?: any;
  erro?: string;
  mensagem?: string;
}
