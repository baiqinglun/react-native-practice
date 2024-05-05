import { View} from 'react-native';
import FilmListItem from '@/components/FilmListItem';
import films from '../../../assets/data/products';

export default function FilmListScreen() {
  return (
    <>
    <View>
    <FilmListItem film={films[4]}/>
    <FilmListItem film={films[1]}/>
    </View>
    </>
  );
}
