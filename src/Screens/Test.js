import { useState } from '@wordpress/element';
import {
	Button,
	Avatar,
	TextArea,
	Badge,
	Input,
	Loader,
	ProgressBar,
	Label,
	ButtonGroup,
	Tabs,
	Toaster,
	toast,
	Title,
	Checkbox,
	Switch,
	RadioButton,
	Select,
	Alert,
	EditorInput,
	Tooltip,
	Skeleton,
	Menu,
} from '@bsf/force-ui';
import {
	MapPinPlusInside,
	Ellipsis,
	RefreshCw,
	LoaderPinwheel,
	Loader as LCLoader,
	House,
	Bell,
	User,
	Plus,
	CircleHelp,
	Info,
	LoaderCircle,
	CreditCard,
	Store,
	PenTool,
	ShoppingBag,
	ShoppingCart,
	Tag,
	Truck,
	MousePointer,
	RefreshCcw,
	ChartNoAxesColumnIncreasing,
} from 'lucide-react';

// Global styles.
// import '@Global/style.scss';

const options = [
	'Red',
	'Orange',
	'Yellow',
	'Green',
	'Cyan',
	'Blue',
	'Purple',
	'Pink',
];

const Test = () => {
	const [activeButton, setActiveButton] = useState(null);

	const handleButtonClick = e => {
		const { value } = e;
		setActiveButton(value.slug);
	};

	const buttons = [
		{ text: 'Button 1', slug: 'btn1' },
		{ text: 'Button 2', slug: 'btn2' },
		{ text: 'Button 3', slug: 'btn3' },
		{ text: 'Button 4', slug: 'btn4', disabled: true },
	];

	const [selectedValue2, setSelectedValue2] = useState('option1');
	const [selectedValue3, setSelectedValue3] = useState('option2');

	const handleRadioChange2 = newValue => {
		setSelectedValue2(newValue);
	};

	const handleRadioChange3 = newValue => {
		setSelectedValue3(newValue);
	};

	const [activeTab, setActiveTab] = useState('tab1');
	const [openTooltip, setOpenTooltip] = useState(false);

	const handleTabChange = ({ value }) => {
		setActiveTab(value.slug);
	};

	<span className="justify-between w-full" />;

	return (
		<div className="p-4 bg-white">
			<h3>Tabs</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div className="flex flex-col gap-3">
					<h4>Pill</h4>
					<div className="flex gap-3 items-center w-[300px]">
						<Tabs.Group
							activeItem={activeTab}
							variant="pill"
							size="md"
							width="full"
							onChange={handleTabChange}
						>
							<Tabs.Tab slug="tab1" text="Tab 1" />
							<Tabs.Tab slug="tab2" text="Tab 2" />
							<Tabs.Tab slug="tab3" text="Tab 3" />
						</Tabs.Group>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Rounded</h4>
					<div className="flex gap-3 items-center w-[300px]">
						<Tabs.Group
							activeItem={activeTab}
							variant="rounded"
							size="md"
							width="full"
							onChange={handleTabChange}
						>
							<Tabs.Tab slug="tab1" text="Tab 1" />
							<Tabs.Tab slug="tab2" text="Tab 2" />
							<Tabs.Tab slug="tab3" text="Tab 3" />
						</Tabs.Group>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Underline</h4>
					<div className="flex gap-3 items-center w-[300px]">
						<Tabs.Group
							activeItem={activeTab}
							variant="underline"
							size="md"
							width="full"
							onChange={handleTabChange}
						>
							<Tabs.Tab slug="tab1" text="Tab 1" />
							<Tabs.Tab slug="tab2" text="Tab 2" />
							<Tabs.Tab slug="tab3" text="Tab 3" />
						</Tabs.Group>
					</div>
				</div>
			</div>
			<hr />
			<div className="gap-3 p-4 m-4 surerank-setting-container">
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						variant="error"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						variant="warning"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						variant="success"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						design={'stack'}
						variant="info"
						action={{
							label: 'Undo',
							onClick: close => {
								close();
							},
							type: 'button',
						}}
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						variant="neutral"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						theme={'dark'}
						variant="error"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						theme={'dark'}
						variant="warning"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						theme={'dark'}
						variant="success"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						theme={'dark'}
						variant="info"
					/>
				</div>
				<div className="pb-4">
					<Alert
						title={'Info alert'}
						content={'This is a description'}
						theme={'dark'}
						variant="neutral"
					/>
				</div>
			</div>
			<h3>Button Group</h3>
			<div className="flex flex-col gap-3 p-4 m-4 surerank-setting-container">
				<div className="flex flex-col gap-3">
					<h4>Button Variants xs</h4>
					<div className="flex items-center gap-3">
						<ButtonGroup.Group
							size="xs"
							activeItem={activeButton}
							onChange={handleButtonClick}
						>
							{buttons.map(button => (
								<ButtonGroup.Button key={button.slug} {...button} />
							))}
						</ButtonGroup.Group>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Button Variants sm</h4>
					<div className="flex items-center gap-3">
						<ButtonGroup.Group
							size="sm"
							activeItem={activeButton}
							onChange={handleButtonClick}
						>
							{buttons.map(button => (
								<ButtonGroup.Button key={button.slug} {...button} />
							))}
						</ButtonGroup.Group>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Button Variants md</h4>
					<div className="flex items-center gap-3">
						<ButtonGroup.Group
							size="md"
							activeItem={activeButton}
							onChange={handleButtonClick}
						>
							{buttons.map(button => (
								<ButtonGroup.Button key={button.slug} {...button} />
							))}
						</ButtonGroup.Group>
					</div>
				</div>
			</div>
			<h3>Button</h3>
			<div className="flex flex-col gap-3 p-4 m-4 surerank-setting-container">
				{/* Button demos added by @Rahul start*/}
				<div className="flex flex-col gap-3">
					<h4>Button Variants</h4>
					<div className="flex items-center gap-3">
						<Button onClick={() => {}} variant="primary">
							Primary
						</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Button Disable</h4>
					<div className="flex items-center gap-3">
						<Button onClick={() => {}} disabled variant="primary">
							Primary d
						</Button>
						<Button variant="secondary" disabled>
							Secondary
						</Button>
						<Button variant="outline" disabled>
							Outline
						</Button>
						<Button variant="ghost" disabled>
							Ghost
						</Button>
						<Button variant="link" disabled>
							Link
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Button Sizes</h4>
					<div className="flex items-center gap-3">
						<Button variant="primary" size="xs">
							Extra Small
						</Button>
						<Button variant="primary" size="sm">
							Small
						</Button>
						<Button variant="primary" size="md">
							Medium
						</Button>
						<Button variant="primary" size="lg">
							Large
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<h4>Button with Icon</h4>
					<div className="flex items-center gap-3">
						<Button variant="primary" iconPosition="right" icon={<House />}>
							Primary
						</Button>
						<Button variant="primary" iconPosition="right" icon={<House />} />
						<Button tag="div" variant="secondary" icon={<House />}>
							Secondary
						</Button>
						<Button variant="outline" icon={<House />}>
							Outline
						</Button>
						<Button variant="ghost" icon={<House />}>
							Ghost
						</Button>
						<Button variant="link" icon={<House />}>
							Link
						</Button>
					</div>
				</div>
				{/* destructive Button */}
				<div className="flex flex-col gap-3">
					<h4>Destructive Button</h4>
					<div className="flex items-center gap-3">
						<Button variant="primary" destructive>
							Primary
						</Button>
						<Button variant="secondary" destructive>
							Secondary
						</Button>
						<Button variant="outline" destructive>
							Outline
						</Button>
						<Button variant="ghost" destructive>
							Ghost
						</Button>
						<Button variant="link" destructive>
							Link
						</Button>
					</div>
				</div>
				{/* Loading Button */}
				<div className="flex flex-col gap-3">
					<h4>Loading Button</h4>
					<div className="flex items-center gap-3">
						<Button
							variant="primary"
							loading={true}
							icon={<LoaderCircle className="animate-spin" />}
						>
							Primary
						</Button>
						<Button
							variant="secondary"
							loading={true}
							icon={<LoaderCircle className="animate-spin" />}
						>
							Secondary
						</Button>
						<Button
							variant="outline"
							loading={true}
							icon={<LoaderCircle className="animate-spin" />}
						>
							Outline
						</Button>
						<Button
							variant="ghost"
							loading={true}
							icon={<LoaderCircle className="animate-spin" />}
						>
							Ghost
						</Button>
						<Button
							variant="link"
							loading={true}
							icon={<LoaderCircle className="animate-spin" />}
						>
							Link
						</Button>
					</div>
				</div>
				{/* Button demos added by @Rahul End*/}
			</div>
			<hr />
			<h3>Switch</h3>
			<div className="flex flex-col items-start gap-10 p-4 m-4 surerank-setting-container">
				<div className="flex gap-2">
					<span className="font-semibold">Sizes →</span>
					<div className="flex items-center justify-start gap-2">
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="font-semibold">lg</span>
							<Switch
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="font-semibold">sm</span>
							<Switch
								size="sm"
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<span className="font-semibold">With label</span>
					<div className="flex items-center justify-start gap-2">
						<div className="flex flex-col items-center justify-center gap-2">
							<Switch
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								label={{
									heading: 'Switch Label',
									description: 'Switch Description',
								}}
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<Switch
								size="sm"
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								label={{
									heading: 'Switch Label',
									description: 'Switch Description',
								}}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<span className="font-semibold">Disabled</span>
					<div className="flex items-center justify-start gap-2">
						<div className="flex flex-col items-center justify-center gap-2">
							<Switch
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								disabled
								label={{
									heading: 'Switch Label',
									description: 'Switch Description',
								}}
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<Switch
								size="sm"
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								disabled
								label={{
									heading: 'Switch Label',
									description: 'Switch Description',
								}}
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2 ml-5">
							<Switch
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								disabled
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<Switch
								size="sm"
								defaultValue={true}
								onChange={value => {
									// Set the value
									return value;
								}}
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<h3>RadioButton</h3>
			<div className="flex flex-col gap-10 p-4 m-4 surerank-setting-container">
				<div className="flex gap-2">
					<span className="font-semibold">Sizes →</span>
					<div className="flex items-center justify-start gap-10">
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="self-start mb-3 font-semibold">lg</span>
							<RadioButton.Group
								as="div"
								className="flex gap-4"
								defaultValue="option-1"
								onChange={value => {
									// Set the value
									return value;
								}}
							>
								<RadioButton.Button
									value="option-1"
									label={{
										heading: 'Option 1',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									value="option-2"
									label={{
										heading: 'Option 2',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									value="option-3"
									label={{
										heading: 'Option 3',
										description: 'Hint text',
									}}
								/>
							</RadioButton.Group>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="self-start mb-3 font-semibold">sm</span>
							<RadioButton.Group
								as="div"
								className="flex gap-4"
								defaultValue="option-1"
								onChange={value => {
									// Set the value
									return value;
								}}
							>
								<RadioButton.Button
									size="sm"
									value="option-1"
									label={{
										heading: 'Option 1',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									size="sm"
									value="option-2"
									label={{
										heading: 'Option 2',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									size="sm"
									value="option-3"
									label={{
										heading: 'Option 3',
										description: 'Hint text',
									}}
								/>
							</RadioButton.Group>
						</div>
					</div>
				</div>
				<div className="flex gap-2">
					<span className="font-semibold">Disabled →</span>
					<div className="flex items-center justify-start gap-10">
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="self-start mb-3 font-semibold">
								Single button
							</span>
							<RadioButton.Group
								as="div"
								className="flex gap-4"
								defaultValue="option-1"
								onChange={value => {
									// Set the value
									return value;
								}}
							>
								<RadioButton.Button
									value="option-1"
									label={{
										heading: 'Option 1',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									value="option-2"
									label={{
										heading: 'Option 2',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									value="option-3"
									label={{
										heading: 'Option 3',
										description: 'Hint text',
									}}
									disabled
								/>
							</RadioButton.Group>
						</div>
						<div className="flex flex-col items-center justify-center gap-2">
							<span className="self-start mb-3 font-semibold">All buttons</span>
							<RadioButton.Group
								as="div"
								className="flex gap-4"
								defaultValue="option-1"
								onChange={value => {
									// Set the value
									return value;
								}}
								disabled
							>
								<RadioButton.Button
									size="sm"
									value="option-1"
									label={{
										heading: 'Option 1',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									size="sm"
									value="option-2"
									label={{
										heading: 'Option 2',
										description: 'Hint text',
									}}
								/>
								<RadioButton.Button
									size="sm"
									value="option-3"
									label={{
										heading: 'Option 3',
										description: 'Hint text',
									}}
								/>
							</RadioButton.Group>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-8">
					<span className="font-semibold">Size → xs</span>
					<div>
						<RadioButton.Group
							value={selectedValue3}
							onChange={handleRadioChange3}
							style="tile"
						>
							<RadioButton.Button value="option1" size="xs" disabled={true}>
								Item 1
							</RadioButton.Button>

							<RadioButton.Button value="option2" size="xs">
								Item 2
							</RadioButton.Button>

							<RadioButton.Button value="option3" size="xs">
								Item 3
							</RadioButton.Button>
						</RadioButton.Group>
					</div>
					<div>
						<RadioButton.Group
							value={selectedValue2}
							onChange={handleRadioChange2}
							style="tile"
						>
							<RadioButton.Button value="option1" size="xs">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option2" size="xs">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option3" size="xs">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option4" size="xs" disabled={true}>
								<Plus />
							</RadioButton.Button>
						</RadioButton.Group>
					</div>
				</div>

				<div className="flex items-center gap-8">
					<span className="font-semibold">Size → sm</span>
					<div>
						<RadioButton.Group
							value={selectedValue3}
							onChange={handleRadioChange3}
							style="tile"
						>
							<RadioButton.Button value="option1" size="sm" disabled={true}>
								Item 1
							</RadioButton.Button>
							<RadioButton.Button value="option2" size="sm">
								Item 2
							</RadioButton.Button>
							<RadioButton.Button value="option3" size="sm">
								Item 3
							</RadioButton.Button>
						</RadioButton.Group>
					</div>
					<div>
						<RadioButton.Group
							value={selectedValue2}
							onChange={handleRadioChange2}
							style="tile"
						>
							<RadioButton.Button value="option1" size="sm">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option2" size="sm">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option3" size="sm">
								<Plus />
							</RadioButton.Button>
							<RadioButton.Button value="option4" size="sm" disabled={true}>
								<Plus />
							</RadioButton.Button>
						</RadioButton.Group>
					</div>
				</div>

				<div className="flex items-center gap-8">
					<span className="font-semibold">Size → md</span>
					<div>
						<RadioButton.Group
							value={selectedValue3}
							onChange={handleRadioChange3}
							style="tile"
						>
							<RadioButton.Button value="option1" disabled={true}>
								Item 1
							</RadioButton.Button>

							<RadioButton.Button value="option2">Item 2</RadioButton.Button>

							<RadioButton.Button value="option3">Item 3</RadioButton.Button>
						</RadioButton.Group>
					</div>
					<div>
						<RadioButton.Group
							value={selectedValue2}
							onChange={handleRadioChange2}
							style="tile"
						>
							<RadioButton.Button value="option1">
								<Plus />
							</RadioButton.Button>

							<RadioButton.Button value="option2">
								<Plus />
							</RadioButton.Button>

							<RadioButton.Button value="option3">
								<Plus />
							</RadioButton.Button>

							<RadioButton.Button value="option4" disabled={true}>
								<Plus />
							</RadioButton.Button>
						</RadioButton.Group>
					</div>
				</div>
			</div>

			<hr />
			<h3>Checkbox</h3>
			<div className="flex flex-col gap-10 p-4 m-4 surerank-setting-container">
				<div className="flex gap-5">
					<span className="font-semibold">Sizes →</span>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">md</span>
						<Checkbox
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
						/>
					</div>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">sm</span>
						<Checkbox
							size="sm"
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
						/>
					</div>
				</div>
				<div className="flex gap-5">
					<span className="font-semibold">With Label →</span>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">md</span>
						<Checkbox
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							label={{
								heading: 'Checkbox Label',
								description: 'Checkbox Description',
							}}
						/>
					</div>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">sm</span>
						<Checkbox
							size="sm"
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							label={{
								heading: 'Checkbox Label',
								description: 'Checkbox Description',
							}}
						/>
					</div>
				</div>
				<div className="flex gap-5">
					<span className="font-semibold">Disabled →</span>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">md</span>
						<Checkbox
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							disabled
						/>
					</div>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">sm</span>
						<Checkbox
							size="sm"
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							disabled
						/>
					</div>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">md with label</span>
						<Checkbox
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							label={{
								heading: 'Checkbox Label',
								description: 'Checkbox Description',
							}}
							disabled
						/>
					</div>
					<div className="flex flex-col items-start justify-start gap-5">
						<span className="font-semibold">sm with label</span>
						<Checkbox
							size="sm"
							defaultChecked={true}
							onChange={value => {
								// Set the value
								return value;
							}}
							label={{
								heading: 'Checkbox Label',
								description: 'Checkbox Description',
							}}
							disabled
						/>
					</div>
				</div>
			</div>
			<hr />
			<h3>Avatar</h3>
			<div className="flex gap-3 p-4 surerank-setting-container">
				<div className="flex items-center gap-4 p-4">
					<h4 className="mr-8">Variant</h4>
					<div className="flex flex-col items-center">
						<h4>White</h4>
						<Avatar size="lg" variant="white" border="none">
							Ana
						</Avatar>
					</div>
					<div className="flex flex-col items-center">
						<h4>Gray</h4>
						<Avatar size="lg" variant="gray" border="none">
							Ana
						</Avatar>
					</div>
					<div className="flex flex-col items-center">
						<h4>Primary</h4>
						<Avatar size="lg" border="none">
							Ana
						</Avatar>
					</div>
					<div className="flex flex-col items-center">
						<h4>Primary Light</h4>
						<Avatar size="lg" variant="primaryLight" border="none">
							Ana
						</Avatar>
					</div>
					<div className="flex flex-col items-center">
						<h4>Dark</h4>
						<Avatar size="lg" variant="dark" border="none">
							Ana
						</Avatar>
					</div>
				</div>
			</div>
			<div className="flex gap-3 p-4 surerank-setting-container">
				<div>
					<div className="flex items-center gap-4 p-4">
						<h4>Border none</h4>
						<Avatar size="lg" variant="white" border="none">
							Ana
						</Avatar>
						<Avatar size="lg" variant="gray" border="none">
							{<User />}
						</Avatar>
						<Avatar size="lg" border="none">
							Vrunda
						</Avatar>
						<Avatar size="lg" variant="primaryLight" border="none">
							{<Bell />}
						</Avatar>
						<Avatar size="lg" variant="dark" border="none">
							Jelena
						</Avatar>
						<Avatar
							size="lg"
							border="none"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
					<div className="flex items-center gap-4 p-4">
						<h4>Border subtle</h4>
						<Avatar size="lg" variant="white">
							Ana
						</Avatar>
						<Avatar size="lg" variant="gray">
							{<User />}
						</Avatar>
						<Avatar size="lg">Vrunda</Avatar>
						<Avatar size="lg" variant="primaryLight">
							{<Bell />}
						</Avatar>
						<Avatar size="lg" variant="dark">
							Jelena
						</Avatar>
						<Avatar
							size="lg"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
					<div className="flex items-center gap-4 p-4">
						<h4>Border ring</h4>
						<Avatar size="lg" variant="white" border="ring">
							Ana
						</Avatar>
						<Avatar size="lg" variant="gray" border="ring">
							{<User />}
						</Avatar>
						<Avatar size="lg" border="ring">
							Vrunda
						</Avatar>
						<Avatar size="lg" variant="primaryLight" border="ring">
							{<Bell />}
						</Avatar>
						<Avatar size="lg" variant="dark" border="ring">
							Jelena
						</Avatar>
						<Avatar
							size="lg"
							border="ring"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
				</div>
			</div>
			<div className="flex gap-3 p-4 surerank-setting-container">
				<div>
					<div className="flex items-center gap-4 p-4">
						<h4 className="mr-7">xs</h4>
						<Avatar size="xs" border="ring">
							Ana
						</Avatar>
						<Avatar size="xs" variant="gray" border="ring">
							{<User />}
						</Avatar>
						<Avatar
							size="xs"
							border="ring"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
					<div className="flex items-center gap-4 p-4">
						<h4 className="mr-7">sm</h4>
						<Avatar size="sm" border="ring">
							Ana
						</Avatar>
						<Avatar size="sm" variant="gray" border="ring">
							{<User />}
						</Avatar>
						<Avatar
							size="sm"
							border="ring"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
					<div className="flex items-center gap-4 p-4">
						<h4 className="mr-7">md</h4>
						<Avatar border="ring">Ana</Avatar>
						<Avatar variant="gray" border="ring">
							{<User />}
						</Avatar>
						<Avatar
							border="ring"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
					<div className="flex items-center gap-4 p-4">
						<h4 className="mr-7">lg</h4>
						<Avatar size="lg" border="ring">
							Ana
						</Avatar>
						<Avatar size="lg" variant="gray" border="ring">
							{<User />}
						</Avatar>
						<Avatar
							size="lg"
							border="ring"
							url="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
						/>
					</div>
				</div>
			</div>
			<hr />
			<h3>Text Area</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<TextArea placeholder={'Small textarea'} size="sm" />
				</div>
				<div>
					<TextArea
						placeholder={'Disabled textarea'}
						disabled={true}
						size="sm"
					/>
				</div>
				<div>
					<TextArea placeholder={'Error textarea'} error={true} size="sm" />
				</div>
				<div>
					<TextArea placeholder={'Medium textarea'} size="md" />
				</div>
				<div>
					<TextArea placeholder={'Large textarea'} size="lg" />
				</div>
			</div>
			<hr />
			<h3>Badges</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Badge label={'Badge'} size="xs" variant="neutral" />
				</div>
				<div>
					<Badge label={'Badge'} size="sm" variant="neutral" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" variant="neutral" />
				</div>
				<div>
					<Badge label={'Badge'} size="lg" variant="neutral" />
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Badge label={'Badge'} size="md" icon={null} variant="red" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" icon={null} variant="yellow" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" icon={null} variant="green" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" icon={null} variant="blue" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" icon={null} variant="inverse" />
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Badge label={'Badge'} size="md" type="rounded" variant="red" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" type="rounded" variant="yellow" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" type="rounded" variant="green" />
				</div>
				<div>
					<Badge
						label={'Badge'}
						size="md"
						type="rounded"
						variant="green"
						closable={false}
					/>
				</div>
				<div>
					<Badge
						label={'Badge'}
						size="md"
						type="rounded"
						variant="blue"
						icon={<MapPinPlusInside />}
					/>
				</div>
				<div>
					<Badge label={'Badge'} size="md" type="rounded" variant="inverse" />
				</div>
				<div>
					<Badge label={'Badge'} size="md" type="rounded" disabled={true} />
				</div>
				<div>
					<Badge label={'Badge'} size="md" type="pill" disabled={true} />
				</div>
			</div>
			<hr />
			<h3>Input</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'text'} size="sm" placeholder="Small" />
				</div>
				<div>
					<Input type={'text'} size="md" placeholder="Medium" />
				</div>
				<div>
					<Input type={'text'} size="lg" placeholder="large" />
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input
						type={'text'}
						prefix={<MapPinPlusInside />}
						size="sm"
						placeholder={'Prefix Icon'}
					/>
				</div>
				<div>
					<Input
						type={'email'}
						prefix={'@'}
						size="sm"
						placeholder="Prefix text"
					/>
				</div>
				<div>
					<Input
						type={'url'}
						size="sm"
						suffix={'%'}
						placeholder={'Suffix text'}
					/>
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'tel'} defaultValue={'+91-9876543210'} size="sm" />
				</div>
				<div>
					<Input
						type={'email'}
						size="sm"
						placeholder={'Input box type email'}
					/>
				</div>
				<div>
					<Input
						type={'text'}
						error={true}
						defaultValue={'Text with error'}
						size="sm"
					/>
				</div>
				<div>
					<Input
						type={'email'}
						disabled={true}
						size="sm"
						placeholder={'Disabled textbox'}
					/>
				</div>
			</div>
			<h3>Upload Field</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'file'} size="sm" />
				</div>
				<div>
					<Input type={'file'} size="md" />
				</div>
				<div>
					<Input type={'file'} size="lg" />
				</div>
				<h4>Normal, Hover, Focus</h4>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'file'} size="sm" disabled={true} />
				</div>
				<div>
					<Input type={'file'} size="md" disabled={true} />
				</div>
				<div>
					<Input type={'file'} size="lg" disabled={true} />
				</div>
				<h4>Disabled</h4>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'file'} size="sm" error={true} />
				</div>
				<div>
					<Input type={'file'} size="md" error={true} />
				</div>
				<div>
					<Input type={'file'} size="lg" error={true} />
				</div>
				<h4>Error</h4>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Input type={'file'} size="sm" />
				</div>
				<div>
					<Input type={'file'} size="md" />
				</div>
				<div>
					<Input type={'file'} size="lg" />
				</div>
				<h4>Active</h4>
			</div>
			<hr />
			<h3>Loader</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Loader size="sm" />
				</div>
				<div>
					<Loader size="md" />
				</div>
				<div>
					<Loader size="lg" />
				</div>
				<div>
					<Loader size="xl" />
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Loader size="sm" variant="secondary" />
				</div>
				<div>
					<Loader size="md" variant="secondary" />
				</div>
				<div>
					<Loader size="lg" variant="secondary" />
				</div>
				<div>
					<Loader size="xl" variant="secondary" />
				</div>
			</div>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div>
					<Loader size="sm" icon={<LCLoader className="animate-spin" />} />
				</div>
				<div>
					<Loader size="md" icon={<Ellipsis className="animate-pulse" />} />
				</div>
				<div>
					<Loader size="lg" icon={<RefreshCw className="animate-spin" />} />
				</div>
				<div>
					<Loader
						size="xl"
						variant="secondary"
						icon={<LoaderPinwheel className="animate-spin" />}
					/>
				</div>
			</div>
			<hr />
			<h3>Progress Bar</h3>
			<div className="flex gap-3 p-4 m-4 surerank-setting-container">
				<div className="w-3/4">
					<ProgressBar progress={79} />
				</div>
			</div>
			<hr />
			<h3>Label</h3>
			<div className="p-4 m-4 surerank-setting-container">
				<div>
					<Label size="xs" variant="neutral">
						Extra Small Label
					</Label>
				</div>
				<div>
					<Label size="sm" variant="neutral">
						Small Label
					</Label>
				</div>
				<div>
					<Label size="md" variant="neutral">
						Medium Label
					</Label>
				</div>
				<div>
					<Label size="md" variant="neutral" required={true}>
						Medium Label with asterisk
					</Label>
				</div>
			</div>
			<div className="p-4 m-4 surerank-setting-container">
				<div>
					<Label size="xs" variant="help">
						Help label with a <a href="https://example.com">link</a>.
					</Label>
				</div>
				<div>
					<Label size="sm" variant="error">
						Error label
					</Label>
				</div>
				<div>
					<Label size="sm" variant="disabled">
						Disabled Label
					</Label>
				</div>
			</div>
			<hr />
			<h3>Title</h3>
			<div className="p-4 m-4 surerank-setting-container">
				<div>
					<Title
						size="xs"
						title={'Extra Small Title'}
						icon={<House />}
						iconPosition={'left'}
						description={'this is a description'}
					/>
				</div>
				<div>
					<Title
						size="sm"
						title={'Small Title'}
						icon={<House />}
						iconPosition={'right'}
						description={'this is a description'}
					/>
				</div>
				<div>
					<Title
						size="md"
						title={'Medium Title'}
						icon={<House />}
						description={'this is a description'}
					/>
				</div>
				<div>
					<Title
						size="lg"
						title={'Large Title'}
						icon={<House />}
						description={'this is a description'}
					/>
				</div>
			</div>
			{/* Toaster */}
			<hr />
			<h3>Toaster</h3>
			<div className="flex flex-wrap items-center justify-start gap-3 p-4 m-4 surerank-setting-container">
				<Toaster dismissAfter={3000} />
				{/* Stack */}
				<div className="flex items-center justify-start gap-1 [&_*]:shrink-0">
					<Button
						size="xs"
						onClick={() => {
							toast.success('Success stack toast', {
								description: 'This is a success description',
							});
						}}
					>
						Show Success Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.info('Info stack toast', {
								description: 'This is an info description',
							});
						}}
					>
						Show Info Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.warning('Warning stack toast', {
								description: 'This is a warning description',
							});
						}}
					>
						Show Warning Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.error('Error stack toast', {
								description: 'This is an error description',
							});
						}}
					>
						Show Error Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast('Default stack toast', {
								description: 'This is a default description',
							});
						}}
					>
						Show Default Toast
					</Button>
				</div>
				{/* Dark */}
				<div className="flex items-center justify-start gap-1 [&_*]:shrink-0">
					<Button
						size="xs"
						onClick={() => {
							toast.success('Success toast', {
								description: 'This is a success description',
								theme: 'dark',
							});
						}}
					>
						Show Dark Success Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.info('Info toast', {
								description: 'This is an info description',
								theme: 'dark',
							});
						}}
					>
						Show Dark Info Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.warning('Warning toast', {
								description: 'This is a warning description',
								theme: 'dark',
							});
						}}
					>
						Show Dark Warning Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.error('Error toast', {
								description: 'This is an error description',
								theme: 'dark',
							});
						}}
					>
						Show Dark Error Toast
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast('Default toast', {
								description: 'This is a default description',
								theme: 'dark',
							});
						}}
					>
						Show Dark Default Toast
					</Button>
				</div>
				<div className="flex items-center justify-start gap-1 [&_*]:shrink-0">
					<Button
						size="xs"
						onClick={() => {
							toast.success('Success toast', {
								description: 'This is a success description',
								theme: 'light',
								action: {
									label: 'Undo',
									onClick: close => {
										close();
									},
									type: 'button',
								},
							});
						}}
					>
						Show Light Success Toast with Action button
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.success('Success toast', {
								description: 'This is a success description',
								theme: 'dark',
								action: {
									label: 'Undo',
									onClick: close => {
										close();
									},
									type: 'button',
								},
							});
						}}
					>
						Show Dark Success Toast with Action button
					</Button>
					<Button
						size="xs"
						onClick={() => {
							toast.custom(
								({ close }) => (
									<div className="text-black">
										<p>Hello, I am a custom toast</p>
										<button onClick={close}>Close</button>
									</div>
								),
								{
									autoDismiss: false,
								}
							);
						}}
					>
						Show Custom Toast
					</Button>
				</div>
			</div>
			<hr />
			<h3>Select</h3>
			<div className="flex flex-wrap items-center gap-10">
				<div className="w-[260px]">
					<span className="block my-5 text-base font-medium">
						Select (Small Size)
					</span>
					<Select onChange={() => {}} size="sm">
						<Select.Button label="Color" />
						<Select.Options dropdownPortalId="surerank-dashboard">
							{options.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select.Options>
					</Select>
				</div>
				<div className="w-[260px]">
					<span className="block my-5 text-base font-medium">
						Select Combobox (Medium Size)
					</span>
					<Select size="md" onChange={() => {}} combobox>
						<Select.Button label="Color" />
						<Select.Options dropdownPortalId="surerank-dashboard">
							{options.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select.Options>
					</Select>
				</div>
				<div className="w-[260px]">
					<span className="block my-5 text-base font-medium">
						Multiselect (Large Size)
					</span>
					<Select size="lg" onChange={() => {}} multiple>
						<Select.Button label="Color" />
						<Select.Options dropdownPortalId="surerank-dashboard">
							{options.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select.Options>
					</Select>
				</div>
				<div className="w-[260px]">
					<span className="block my-5 text-base font-medium">
						Multiselect Combobox (Default size)
					</span>
					<Select onChange={() => {}} multiple combobox>
						<Select.Button label="Color" />
						<Select.Options dropdownPortalId="surerank-dashboard">
							{options.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select.Options>
					</Select>
				</div>
			</div>
			<hr />
			<h3>Editor Input</h3>
			<div className="mt-5 mb-20 space-y-10">
				<div className="flex items-center gap-2">
					<span className="my-1 font-medium">Size sm →</span>
					<div className="w-full max-w-sm">
						<EditorInput
							size="sm"
							options={options}
							onChange={editorState => editorState.toJSON()}
						/>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<span className="my-1 font-medium">Size md →</span>
					<div className="w-full max-w-sm">
						<EditorInput
							size="md"
							options={options}
							onChange={editorState => editorState.toJSON()}
						/>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<span className="my-1 font-medium">Size lg →</span>
					<div className="w-full max-w-sm">
						<EditorInput
							size="lg"
							options={options}
							onChange={editorState => editorState.toJSON()}
						/>
					</div>
				</div>
			</div>
			<hr />
			<h3>Tooltip</h3>
			<div className="flex justify-between px-12 py-4 mb-6">
				<div className="flex items-center gap-4">
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						placement="top"
						title="Tooltip Title"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						arrow
					>
						<button>Hover over me</button>
					</Tooltip>
					{/* Click only mode */}
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip Title"
						placement="top-start"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						triggers={['click']}
						arrow
					>
						<button>Click me</button>
					</Tooltip>
					{/* Interactive Tooltip */}
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip Title"
						placement="top-end"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						arrow
						interactive
					>
						<button>Hover over me</button>
					</Tooltip>
					{/* Controlled tooltip */}
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip Title"
						placement="right"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						arrow
						interactive
						variant="dark"
						open={openTooltip}
						setOpen={setOpenTooltip}
					>
						<Info onClick={() => setOpenTooltip(prev => !prev)} />
					</Tooltip>
					{/* Interactive Tooltip */}
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip Title"
						placement="top-start"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						arrow
						interactive
					>
						<a href="https://example.com">Link</a>
					</Tooltip>
				</div>
				<div>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						placement="top"
						title="Tooltip Title"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						arrow
					>
						<CircleHelp />
					</Tooltip>
				</div>
			</div>
			<div className="flex justify-between p-12 bg-tooltip-background-dark">
				<div className="grid grid-cols-3 w-80">
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="top-start"
						variant="light"
					>
						<button>Top-Start</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="top"
						variant="light"
					>
						<button>Top</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="top-end"
						variant="light"
					>
						<button>Top-End</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="right-start"
						variant="light"
					>
						<button>Right-Start</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="right"
						variant="light"
					>
						<button>Right</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="right-end"
						variant="light"
					>
						<button>Right-End</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="bottom-start"
						variant="light"
					>
						<button>Bottom-Start</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="bottom"
						variant="light"
					>
						<button>Bottom</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="bottom-end"
						variant="light"
					>
						<button>Bottom-End</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="left-start"
						variant="light"
					>
						<button>Left-Start</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="left"
						variant="light"
					>
						<button>Left</button>
					</Tooltip>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip"
						placement="left-end"
						variant="light"
					>
						<button>Left-End</button>
					</Tooltip>
				</div>
				<div>
					<Tooltip
						tooltipPortalId="surerank-dashboard"
						boundary={document.getElementById('surerank-dashboard')}
						title="Tooltip Title"
						placement="bottom"
						variant="light"
						content={
							<span>
								<strong>Tooltips</strong> are used to describe or identify an
								element. In most scenarios, tooltips help the user understand
								meaning, function or alt-text.
							</span>
						}
						triggers={['click']}
						arrow
					>
						<Info />
					</Tooltip>
				</div>
			</div>
			<hr />
			<h3>Skeleton</h3>
			<div className="flex">
				<Skeleton variant="circular" className="mr-4 size-10" />
				<div>
					<Skeleton variant="rectangular" className="h-3 mb-2 w-96" />
					<Skeleton variant="rectangular" className="h-3 w-72" />
				</div>
			</div>
			<Skeleton variant="rectangular" className="h-48 mt-4 w-96" />
			<hr />
			<h3>Menu Item Component - Sidebar</h3>
			<div className="flex gap-14">
				<Menu>
					<h4 className="text-center">Size - medium</h4>
					<Menu.List heading="Store" open={true} arrow={true}>
						<Menu.Item>
							<Store />
							<div>Store Settings</div>
						</Menu.Item>
						<Menu.Item disabled>
							<PenTool />
							<div>Design & Branding</div>
						</Menu.Item>
					</Menu.List>
					<Menu.List heading="Orders & Sales" open={true} arrow={true}>
						<Menu.Item>
							<ShoppingBag />
							<div>Orders & Receipts</div>
						</Menu.Item>
						<Menu.Item active={true}>
							<ShoppingCart />
							<div>Abandoned Checkout</div>
						</Menu.Item>
						<Menu.Item>
							<Tag />
							<div>Taxes</div>
						</Menu.Item>
						<Menu.Item>
							<Truck />
							<div>Shipping</div>
						</Menu.Item>
						<Menu.Item>
							<CreditCard />
							<div>Payment Processors</div>
						</Menu.Item>
					</Menu.List>
					<Menu.Separator />
					<Menu.List heading="Customers" open={true} arrow={true}>
						<Menu.Item>
							<MousePointer />
							<div>Affiliates</div>
						</Menu.Item>
						<Menu.Item>
							<RefreshCcw />
							<div>Subscriptions</div>
						</Menu.Item>
						<Menu.Item>
							<ChartNoAxesColumnIncreasing />
							<div>Subscriptions Saver</div>
						</Menu.Item>
					</Menu.List>
				</Menu>
				<Menu size="sm">
					<h4 className="text-center">Size - small</h4>
					<Menu.List heading="Store" open={true} arrow={true}>
						<Menu.Item>
							<Store />
							<div>Store Settings</div>
						</Menu.Item>
						<Menu.Item>
							<PenTool />
							<div>Design & Branding</div>
						</Menu.Item>
					</Menu.List>
					<Menu.List heading="Orders & Sales" open={true} arrow={true}>
						<Menu.Item>
							<ShoppingBag />
							<div>Orders & Receipts</div>
						</Menu.Item>
						<Menu.Item>
							<ShoppingCart />
							<div>Abandoned Checkout</div>
						</Menu.Item>
						<Menu.Item>
							<Tag />
							<div>Taxes</div>
						</Menu.Item>
						<Menu.Item disabled>
							<Truck />
							<div>Shipping</div>
						</Menu.Item>
						<Menu.Item>
							<CreditCard />
							<div>Payment Processors</div>
						</Menu.Item>
					</Menu.List>
					<Menu.Separator />
					<Menu.List heading="Customers" open={true} arrow={true}>
						<Menu.Item active={true}>
							<MousePointer />
							<div>Affiliates</div>
						</Menu.Item>
						<Menu.Item>
							<RefreshCcw />
							<div>Subscriptions</div>
						</Menu.Item>
						<Menu.Item>
							<ChartNoAxesColumnIncreasing />
							<div>Subscriptions Saver</div>
						</Menu.Item>
					</Menu.List>
				</Menu>
			</div>
		</div>
	);
};

export default Test;
