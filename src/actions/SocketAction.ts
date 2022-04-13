export enum ActionType {
  InitialConnect = 'InitialConnect',
}

export const InitialConnect = () => {
  return {
    type: ActionType.InitialConnect,
  };
};
