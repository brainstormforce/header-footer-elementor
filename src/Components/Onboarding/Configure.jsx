import React from 'react'
import {
  Container,
  Topbar,
  Button,
  ProgressSteps,
  Title
} from "@bsf/force-ui";
import FeatureWidgets from '@components/Widgets/Features/FeatureWidgets';
import { __ } from "@wordpress/i18n";
import { MoveLeft, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Configure = ({ setCurrentStep }) => {
  return (
    <div className='bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm' style={{ width: '1064px' }}>
      <div className='p-10'>
        <Title
          description=""
          icon={null}
          iconPosition="right"
          className="max-w-lg"
          size="lg"
          tag="h3"
          title={__("Customize your UAE setup", "header-footer-elementor")}
        />
        <p className="text-sm font-medium text-text-tertiary m-0 mt-2">
          {__(
            "Activate only what you need to keep your website fast and optimised.",
            "header-footer-elementor"
          )}
        </p>
      </div>
      <FeatureWidgets />
      <div className='flex items-center justify-between p-10'>
        <Button
          icon={<ChevronLeft />}
          iconPosition="left"
          variant="outline"
          className="uael-remove-ring"
          onMouseEnter={(e) =>
            (e.currentTarget.style.color =
              "#000000") &&
            (e.currentTarget.style.borderColor =
              "#000000")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color =
              "#6005FF") &&
            (e.currentTarget.style.borderColor =
              "#6005FF")
          }
          onClick={() => setCurrentStep(1)}
        >
          {__("Back", "header-footer-elementor")}
        </Button>
        <div className='flex gap-3'>
          <Button
            variant="ghost"
            className="uael-remove-ring"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color =
                "#000000") &&
              (e.currentTarget.style.borderColor =
                "#000000")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color =
                "#6005FF") &&
              (e.currentTarget.style.borderColor =
                "#6005FF")
            }
          >
            {__("Skip", "header-footer-elementor")}
          </Button>
          <Button
            icon={<ChevronRight />}
            iconPosition="right"
            variant="primary"
            className="bg-[#6005FF] uael-remove-ring"
            style={{
              backgroundColor: "#6005FF",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "#4B00CC")
            }
            onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              "#6005FF")
            }
            onClick={() => setCurrentStep(3)}
          >
            {__("Next", "header-footer-elementor")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Configure
