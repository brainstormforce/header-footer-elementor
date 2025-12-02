import React from 'react';
import { Button } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { X, Check, Plus, ArrowRight, Package, CheckIcon } from 'lucide-react';

const Welcome = ( { setCurrentStep } ) => {
	return (
		<div className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm p-8  flex flex-col">
			<div className="px-1">
				<div className="flex flex-col">
					<h1
						className="text-text-primary m-0 mb-2 hfe-65-width"
						style={ { fontSize: '30px', lineHeight: '1.3em' } }
					>
						<span className="block">
							{ __( 'Welcome to UAE', 'header-footer-elementor' ) }
						</span>
					</h1>
					<span
						className="text-md font-medium m-0 mb-4"
						style={ { lineHeight: '1.5em', color: '#111827' } }
					>
						{ __(
							'Your Ultimate Elementor Addons to build modern Elementor Websites.',
							'header-footer-elementor',
						) }
					</span>
				</div>
				<iframe
					width="500"
					height="280"
					src="https://www.youtube.com/embed/YqWd3VYlxcY?modestbranding=1&showinfo=0&rel=0&controls=1"
					frameBorder="0"
					style={ { borderRadius: '8px' } }
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>

				<ul
					className="list-none font-normal "
					style={ {
						fontSize: '0.9rem',
						lineHeight: '1.6em',
						paddingBottom: '0.5rem',
						color: '#111827',
					} }
				>
					<li
						className="none   "
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: '0.5rem',
							color: '#111827',
						} }
					>
						<CheckIcon color="#111827" size={ 18 } />
						{ __(
							'No bloat — disable unused widgets with one click',
							'header-footer-elementor',
						) }
					</li>
					<li
						className="none "
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: '0.5rem',
							color: '#111827',
						} }
					>
						<CheckIcon color="#111827" size={ 18 } />
						{ __(
							'Design headers & footers exactly where you want them',
							'header-footer-elementor',
						) }
					</li>
					<li
						className="none "
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
							gap: '0.5rem',
							color: '#111827',
						} }
					>
						<CheckIcon color="#111827" size={ 18 } />
						{ __(
							'Reliable support from experts when you need it',
							'header-footer-elementor',
						) }
					</li>
				</ul>
				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={ {
						marginTop: '20px',
						marginBottom: '20px',
						borderColor: '#E5E7EB',
					} }
				/>
				<Button
					iconPosition="right"
					variant="primary"
					className="bg-[#5C2EDE] hfe-remove-ring p-3 px-5 font-bold mt-2"
					style={ {
						backgroundColor: '#5C2EDE',
						transition: 'background-color 0.3s ease',
					} }
					onMouseEnter={ ( e ) =>
						( e.currentTarget.style.backgroundColor = '#5C2EDE' )
					}
					onMouseLeave={ ( e ) =>
						( e.currentTarget.style.backgroundColor = '#5C2EDE' )
					}
					onClick={ () => setCurrentStep( 2 ) }
				>
					{ __( "Let's Get Started", 'header-footer-elementor' ) }
				</Button>
			</div>
		</div>
	);
};

export default Welcome;
