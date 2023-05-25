/**
 * 삭제 가능한 내역의 총 금액을 계산하는 함수
 * @param histories 내역 리스트
 * @param id 삭제하려는 내역의 id
 */
export default function calcTotalPrice(histories, id) {
  return histories
    .filter((history) => history.id !== id && history.deletable)
    .reduce((prev, current) => prev + current.price, 0);
}
