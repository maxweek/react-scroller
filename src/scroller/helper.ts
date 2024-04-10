export function getCl(condition?: boolean, conditionTrue?: string, conditionFalse: string = ''): string {
  return condition ? `__${conditionTrue}` : (conditionFalse ? `__${conditionFalse}` : '');
}

export function getClR(className: any): string {
  return className ? className : ''
}