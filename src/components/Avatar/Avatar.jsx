import React from 'react';
import { MdFace } from 'react-icons/md';

export default function Avatar({ image }) {
  return (
    <div>
      {image && <img src={image} alt="아바타" />}
      {!image && <MdFace />}
    </div>
  );
}
