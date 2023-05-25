import React from 'react';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import SheetBody from '../common/BottomSheet/SheetBody';
import { ATTEND, CREATE } from '../../constants/bottomSheetTag';
import CardList from './CardList';

export default function Main() {
  return (
    <>
      <CardList />
      <BottomSheet>
        <BottomSheet.Header>
          <BottomSheet.Button text='모임 만들기' type='button' tag={CREATE} />
          <BottomSheet.Button text='모임 참여하기' type='button' tag={ATTEND} />
        </BottomSheet.Header>
        <BottomSheet.Body>
          <SheetBody.ClassCreateForm tag={CREATE} />
          <SheetBody.ClassAttendForm tag={ATTEND} />
        </BottomSheet.Body>
      </BottomSheet>
    </>
  );
}
