import React from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

function Dropdown({ data, title, id, itemKey, value, handleSelect, promptHeading }) {

    return (

        <Picker
            onValueChange={handleSelect}
            mode="dialog"
            prompt={promptHeading}
            selectedValue={title}
            style={{ flex: 1.5 }}
        >
            {_.map(data, (item) => (
                <Picker.Item label={itemKey ? item[itemKey] : item}
                    value={value ? item[value] : item}
                    key={id}
                />)
            )}
        </Picker>
    );
}

Dropdown.propTypes = {
    data: PropTypes.array,
};

export default Dropdown;
