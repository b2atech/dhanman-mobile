import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faLayerGroup,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import {getBuildingNames} from '../../api/myHome/building';
import {getFloorName} from '../../api/myHome/floor';
import {getUnitNames} from '../../api/myHome/unit';
import commonStyles from '../../commonStyles/commonStyles';

const UnitSelection = ({onSelectionComplete}) => {
  const [stage, setStage] = useState('building');
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [selectedUnitsId, setSelectedUnitsId] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildings = await getBuildingNames(
          '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
        );
        const filteredBuildings = buildings.filter(
          building =>
            building.name === 'Building A' || building.name === 'Building B',
        );
        setBuildings(filteredBuildings);
      } catch (error) {
        console.error('Error fetching building data', error);
      }
    };

    fetchBuildings();
  }, []);

  const handleBuildingSelect = async buildingId => {
    setSelectedBuilding(buildingId);
    try {
      const floors = await getFloorName(
        '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
        buildingId,
      );
      setFloors(floors);
      setStage('floor');
    } catch (error) {
      console.error('Error fetching floor data', error);
    }
  };

  const handleFloorSelect = async floorId => {
    setSelectedFloor(floorId);
    try {
      const units = await getUnitNames(
        '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
        selectedBuilding,
        floorId,
      );
      setUnits(units);
      setStage('unit');
    } catch (error) {
      console.error('Error fetching unit data', error);
    }
  };

  const handleUnitSelect = unitId => {
    setSelectedUnitsId(prevSelectedUnitsId =>
      prevSelectedUnitsId.includes(unitId)
        ? prevSelectedUnitsId.filter(id => id !== unitId)
        : [...prevSelectedUnitsId, unitId],
    );
    const unit = units.find(u => u.id === unitId);
    const unitLabel = `${unit ? unit.name : unitId}`;
    setSelectedUnits(prevSelectedUnits =>
      prevSelectedUnits.includes(unitLabel)
        ? prevSelectedUnits.filter(id => id !== unitLabel)
        : [...prevSelectedUnits, unitLabel],
    );
  };

  const completeSelection = () => {
    onSelectionComplete(
      selectedBuilding,
      selectedFloor,
      selectedUnits,
      selectedUnitsId,
    );
  };

  const renderOptions = (
    options,
    onSelect,
    icon,
    selectedOptions = [],
    isHorizontal = false,
  ) => {
    const rows = [];
    for (let i = 0; i < options.length; i += 4) {
      const row = options.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.row}>
          {row.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.option,
                isHorizontal && styles.horizontalOption,
                selectedOptions.includes(option.id) && styles.selectedOption,
              ]}
              onPress={() => onSelect(option.id)}>
              <FontAwesomeIcon icon={icon} size={30} />
              <Text style={commonStyles.headerText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>,
      );
    }
    return rows;
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.container}>
      {stage === 'building' && (
        <View style={styles.screen}>
          <Text style={styles.header}>Select Building</Text>
          {renderOptions(buildings, handleBuildingSelect, faBuilding, [
            selectedBuilding,
          ])}
        </View>
      )}
      {stage === 'floor' && (
        <View style={styles.screen}>
          <Text style={styles.header}>Select Floor in {selectedBuilding}</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.horizontalScrollContainer}>
            {renderOptions(
              buildings,
              handleBuildingSelect,
              faBuilding,
              [selectedBuilding],
              true,
            )}
          </ScrollView>
          {renderOptions(floors, handleFloorSelect, faLayerGroup, [
            selectedFloor,
          ])}
        </View>
      )}
      {stage === 'unit' && (
        <View style={styles.screen}>
          <Text style={styles.header}>
            Select Unit in {selectedBuilding} - Floor {selectedFloor}
          </Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.horizontalScrollContainer}>
            {renderOptions(
              floors,
              handleFloorSelect,
              faLayerGroup,
              [selectedFloor],
              true,
            )}
          </ScrollView>
          <View>
            {renderOptions(units, handleUnitSelect, faHome, selectedUnits)}
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.selectedUnitsScrollContainer}>
            {selectedUnits.map(unit => (
              <View key={unit} style={styles.selectedUnit}>
                <Text style={styles.selectedUnitText}>{unit}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={completeSelection}>
            <Text style={styles.completeButtonText}>Add flat</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  option: {
    width: '30%',
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  horizontalOption: {
    width: 80,
    height: 100,
    marginHorizontal: 10,
  },
  selectedOption: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalScrollContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  selectedUnitsScrollContainer: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  selectedUnit: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedUnitText: {
    fontSize: 16,
    color: '#333',
  },
});
export default UnitSelection;
