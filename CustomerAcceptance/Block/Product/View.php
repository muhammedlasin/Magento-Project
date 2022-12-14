<?php
namespace TerrificMinds\CustomerAcceptance\Block\Product;

class View extends \Magento\Framework\View\Element\Template
{
    /**
     * @var \TerrificMinds\CustomerAcceptance\Helper\Data
     */
    protected $_dataHelper;

    /**
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \TerrificMinds\CustomerAcceptance\Helper\Data $dataHelper
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \TerrificMinds\CustomerAcceptance\Helper\Data $dataHelper,
        array $data = []
    )
    {
        $this->_dataHelper = $dataHelper;
        parent::__construct($context, $data);
    }

    public function canShowBlock()
    {
        return $this->_dataHelper->isModuleEnabled();
    }
}