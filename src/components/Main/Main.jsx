import React from 'react';
import BottomSheet from '../common/BottomSheet/BottomSheet';
import Body from '../common/BottomSheet/Body/Body';
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
          <Body.ClassCreateForm tag={CREATE} />
          <Body.ClassAttendForm tag={ATTEND} />
        </BottomSheet.Body>
      </BottomSheet>
    </>
  );
}
