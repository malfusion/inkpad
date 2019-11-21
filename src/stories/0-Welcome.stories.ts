// import { Welcome } from '@storybook/angular/demo';
import { ArtsComponent } from 'src/app/arts/arts.component';

export default {
  title: 'Art Piece 1',
};

export const toStorybook = () => ({
  component: ArtsComponent,
  props: {},
});

toStorybook.story = {
  name: 'to Storybook',
};
