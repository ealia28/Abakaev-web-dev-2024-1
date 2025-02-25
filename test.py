import subprocess
import pytest

INTERPRETER = 'python'

def run_script(filename, input_data=None):
    proc = subprocess.run(
        [INTERPRETER, filename],
        input='\n'.join(input_data if input_data else []),
        capture_output=True,
        text=True,
        check=False
    )
    return proc.stdout.strip()

test_data = {
    'hello_world': [
        ([], 'Hello, World!')
    ],
    'python_if_else': [
    ('1', 'Weird'),
    ('4', 'Not Weird'),
    ('3', 'Weird'),
    ('6', 'Weird'),
    ('22', 'Not Weird'),
    ('100', 'Not Weird'),
    ('101', 'Weird'),
    ('2', 'Not Weird'),
    ('8', 'Weird'),
    ('20', 'Weird')
    ],
    'arithmetic_operators': [
    (['1', '2'], ['3', '-1', '2']),
    (['10', '5'], ['15', '5', '50']),
    (['0', '0'], ['0', '0', '0']),
    (['-1', '1'], ['0', '-2', '-1']),
    (['100', '50'], ['150', '50', '5000']),
    (['5', '5'], ['10', '0', '25']),
    (['7', '3'], ['10', '4', '21']),
    (['12', '4'], ['16', '8', '48']),
    (['9', '9'], ['18', '0', '81']),
    (['2', '8'], ['10', '-6', '16'])
    ],

    'division': [
    (['3', '5'], ['0', '0.6']),
    (['10', '2'], ['5', '5.0']),
    (['7', '3'], ['2', '2.3333333333333335']),
    (['0', '5'], ['0', '0.0']),
    (['100', '25'], ['4', '4.0']),
    (['9', '2'], ['4', '4.5']),
    (['1', '1'], ['1', '1.0']),
    (['8', '3'], ['2', '2.6666666666666665']),
    (['6', '6'], ['1', '1.0']),
    (['50', '10'], ['5', '5.0'])
    ],
    'loops': [
        ('3', ['0', '1', '4']),
        ('5', ['0', '1', '4', '9', '16'])
    ],
    'print_function': [
    ('3', '123'),
    ('5', '12345'),
    ('1', '1'),
    ('10', '12345678910'),
    ('7', '1234567'),
    ('2', '12'),
    ('4', '1234'),
    ('6', '123456'),
    ('8', '12345678'),
    ('9', '123456789')
    ],
    'second_score': [
        (['5', '2 3 6 6 5'], '5'),
    (['4', '1 2 3 4'], '3'),
    (['6', '1 1 2 2 3 3'], '2'),
    (['3', '5 5 5'], '5'),
    (['7', '10 20 30 40 50 60 70'], '60'),
    (['2', '1 2'], '1'),
    (['8', '5 5 5 5 5 5 5 5'], '5'),
    (['9', '9 8 7 6 5 4 3 2 1'], '8'),
    (['10', '10 10 10 10 10 10 10 10 10 10'], '10'),
    (['1', '1'], '1')
    ],
    'nested_list': [
        ([
            '5', 'Harry', '37.21', 'Berry', '37.21', 'Tina', '37.2', 'Akriti', '41', 'Harsh', '39'
        ], ['Berry', 'Harry'])
    ],
    'lists': [
        ([
            '12', 'insert 0 5', 'insert 1 10', 'insert 0 6', 'print',
            'remove 6', 'append 9', 'append 1', 'sort', 'print', 'pop', 'reverse', 'print'
        ], ['[6, 5, 10]', '[1, 5, 9, 10]', '[9, 5, 1]'])
    ],
    'swap_case': [
        ('Www.MosPolytech.ru', 'wWW.mOSpOLYTECH.RU'),
        ('Pythonist 2', 'pYTHONIST 2')
    ],
    'split_and_join': [
        ('this is a string', 'this-is-a-string'),
        ('hello world', 'hello-world')
    ],
    'max_word': [
        ('example.txt', ['сосредоточенности'])
    ],
    'price_sum': [
        ('products.csv', ['6842.84', '5891.06', '6810.90'])
    ],
    'anagram': [
        (['listen', 'silent'], 'YES'),
        (['hello', 'world'], 'NO')
    ],
    'metro': [
        ([
            '3', '10 20', '15 25', '20 30', '20'
        ], '3'),
        ([
            '3', '10 20', '15 25', '20 30', '25'
        ], '2')
    ],
    'minion_game': [
        ('BANANA', 'Stuart 12'),
        ('APPLE', 'Stuart 9')
    ],
    'is_leap': [
        ('2000', 'True'),
        ('1900', 'False'),
        ('2024', 'True')
    ],
    'happiness': [
        ([
            '3 2', '1 5 3', '3 1', '5 7'
        ], '1')
    ],
    'pirate_ship': [
        ([
            '15 3', 'gold 10 100', 'silver 5 50', 'bronze 2 20'
        ], ['gold 10 100', 'silver 5 50'])
    ],
    'matrix_mult': [
        ([
            '2', '1 2', '3 4', '5 6', '7 8'
        ], ['19 22', '43 50'])
    ]
}

def test_hello_world():
    assert run_script('hello_world.py') == 'Hello, World!'

@pytest.mark.parametrize("input_data, expected", test_data['python_if_else'])
def test_python_if_else(input_data, expected):
    assert run_script('python_if_else.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['arithmetic_operators'])
def test_arithmetic_operators(input_data, expected):
    assert run_script('arithmetic_operators.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['division'])
def test_division(input_data, expected):
    assert run_script('division.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['loops'])
def test_loops(input_data, expected):
    assert run_script('loops.py', [input_data]).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['print_function'])
def test_print_function(input_data, expected):
    assert run_script('print_function.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['second_score'])
def test_second_score(input_data, expected):
    assert run_script('second_score.py', input_data) == expected

@pytest.mark.parametrize("input_data, expected", test_data['nested_list'])
def test_nested_list(input_data, expected):
    assert run_script('nested_list.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['lists'])
def test_lists(input_data, expected):
    output = run_script('lists.py', input_data)
    assert output.split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['swap_case'])
def test_swap_case(input_data, expected):
    assert run_script('swap_case.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['split_and_join'])
def test_split_and_join(input_data, expected):
    assert run_script('split_and_join.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['max_word'])
def test_max_word(input_data, expected):
    assert run_script('max_word.py', [input_data]).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['price_sum'])
def test_price_sum(input_data, expected):
    assert run_script('price_sum.py', [input_data]).split() == expected

@pytest.mark.parametrize("input_data, expected", test_data['anagram'])
def test_anagram(input_data, expected):
    assert run_script('anagram.py', input_data) == expected

@pytest.mark.parametrize("input_data, expected", test_data['metro'])
def test_metro(input_data, expected):
    assert run_script('metro.py', input_data) == expected

@pytest.mark.parametrize("input_data, expected", test_data['minion_game'])
def test_minion_game(input_data, expected):
    assert run_script('minion_game.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['is_leap'])
def test_is_leap(input_data, expected):
    assert run_script('is_leap.py', [input_data]) == expected

@pytest.mark.parametrize("input_data, expected", test_data['happiness'])
def test_happiness(input_data, expected):
    assert run_script('happiness.py', input_data) == expected

@pytest.mark.parametrize("input_data, expected", test_data['pirate_ship'])
def test_pirate_ship(input_data, expected):
    assert run_script('pirate_ship.py', input_data).split('\n') == expected

@pytest.mark.parametrize("input_data, expected", test_data['matrix_mult'])
def test_matrix_mult(input_data, expected):
    assert run_script('matrix_mult.py', input_data).split('\n') == expected